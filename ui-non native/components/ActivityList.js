import { useState, useEffect } from "react";
import { FlatList, View, Button, Text, StyleSheet, Alert } from "react-native";
import ActivityInput from "./ActivityInput";
import * as SQLite from 'expo-sqlite';
import NetInfo from "@react-native-community/netinfo";


function ActivityList() {
  const appStatus = true;
  const db = SQLite.openDatabase('activities.db');
  const [activities, setActivities] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineQueue, setOnlineQueue] = useState([]);

  //verify if the device is connected to the internet
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsConnected(state.isConnected);
  //     console.log(state.isConnected)
  //     if(state.isConnected)
  //       moveChangesToOnline();
  //   });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, category TEXT, location TEXT, feedback TEXT)');
    });
  }, [])

  //initialize the data
  useEffect(() => {
    fetchData();
  }, [isConnected]);

  useEffect(() => {
    if(isConnected){
      moveChangesToOnline();
    }
  }, [isConnected])

  const toggleModal = () => {
    setModalVisible(true);
  };

  const toggleModalAdd = () => {
    setSelectedActivity(null)
    toggleModal()
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const turnOnOffNetwork = () => {
    if(isConnected){
      setIsConnected(false);
    }
    else{
      setIsConnected(true);
    }
  }

  const moveChangesToOnline = () => {
    for(const element of onlineQueue){
      if(element[0] == "POST"){
        console.log("ADDING ELEMENT TO ONLINE!");
        addActivityConnected(element[1]);
      }
      else if(element[0] == "PUT"){
        console.log("UPDATING ELEMENT!");
        updateActivityConnected(element[1]);
      }
      else if(element[0] == "DELETE"){
        console.log("DELETEING ELEMENT!");
        deleteActivityConnected(element[1]);
      }
    }
    setOnlineQueue([]);
  }

  //fetch data function
  const fetchData = async () => {
    if (isConnected) {
      try {
        const response = await fetch('http://192.168.1.101:8080/activity/get-activities', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setActivities(json);
      } catch (error) {
        Alert.alert("Error when trying to get activities from the server: " + error);
      }
    } else {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM activities',
          [],
          (txObj, resultSet) => {
            setActivities(resultSet.rows._array);
          },
          (txObj, error) => Alert.alert("Error when trying to get all activities: " + error)
        );
      });
    }
  };

  //ADD FUNCTIONALITIES

  //function for local db add
  const addActivityFun = (newActivity) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO activities (title, description, date, category, location, feedback) VALUES (?, ?, ?, ?, ?, ?)',
        [newActivity.title, newActivity.description, newActivity.date, newActivity.category, newActivity.location, newActivity.feedback],
        (txObj, resultSet) => {
          const insertedId = resultSet.insertId;
          const activityWithNewField = {
            ...newActivity,
            id: insertedId,
          };
        },
        (txObj, error) => Alert.alert("Error when trying to add an activity: " + error)
      );
    });
    setModalVisible(false);
  }

  //function for server add
  const addActivityConnected = (newActivity) => {
    fetch('http://192.168.1.101:8080/activity/add-activity', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity)
      }).then((response) => {
        if(!response.ok){
          throw new Error('HTTP error! Status: ${response.status}')
        }
        }).catch((error) => {
          console.log(error + "\n")
          Alert.alert('An error has occured! ' + error)
        })
  }

  //button onpress function for add
  const addActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
    fetchData();
    if(isConnected){
      addActivityConnected(newActivity);
      addActivityFun(newActivity);
    } else {
      setOnlineQueue(prevQueue => [...prevQueue, ["POST", newActivity]]);
      addActivityFun(newActivity);
    }

  };

  //UPDATE FUNCTIONALITIES

  //function for local db update
  const updateActivityFun = (updatedValues) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'UPDATE activities SET title=?, description=?, date=?, category=?, location=?, feedback=? WHERE id=?',
          [updatedValues.title, updatedValues.description, updatedValues.date, updatedValues.category, updatedValues.location, updatedValues.feedback, updatedValues.id],
          (txObj, resultSet) => {
            if(!isConnected){
              setActivities((prevActivities) => {
                const updatedActivities = prevActivities.map((activity) => {
                  if (activity.title === updatedValues.title) {
                    return {
                      ...activity,
                      ...updatedValues,
                    };
                  }
                  return activity;
                });
    
                return updatedActivities;
              });
            }
          },
          (txObj, error) => Alert.alert("Error when trying to update an activity: " + error)
        );
      }
    );
    closeModal();
  }

  //function for server update
  const updateActivityConnected = (updatedActivity) => {
    fetch('http://192.168.1.101:8080/activity/update-activity', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedActivity)
    }).then((response) => {
      return response.json()
    }).then((json) => {
      setActivities((prevActivities) => {
        const updatedActivities = prevActivities.map((activity) => {
          if (activity.title === json.title) {
            return {
              ...activity,
              ...json,
            };
          }
          return activity;
        });
        return updatedActivities;
      });
    })
  }

  //button onpress function for update
  const updateSelectedActivity = (updatedActivity) => {
    if(isConnected){
      updateActivityConnected(updatedActivity);
      updateActivityFun(updatedActivity);
    }else{
      setOnlineQueue(prevQueue => [...prevQueue, ["PUT", updatedActivity]]);
      updateActivityFun(updatedActivity);
    }
  };

  //DELETE FUNCTIONALITIES

  //delete function for the local db
  const deleteActivityFun = (titleToDelete) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM activities WHERE title = ?',
        [titleToDelete],
        (txObj, resultSet) => {
          setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity.title !== titleToDelete)
          );
        },
        (txObj, error) => Alert.alert("Error when trying to delete an activity: " + error)
      );
    });
    closeModal();
  }

  //delete function for the server
  const deleteActivityConnected = (activityTitle) => {
    fetch("http://192.168.1.101:8080/activity/delete-activity?title="+activityTitle, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json();
    }).catch((error) => {
        console.log(error + "\n")
        Alert.alert('An error has occurred! ' + error)
    });
  }
  

  //buton onpress function for delete
  const deleteSelectedActivity = (titleToDelete) => {
    if(isConnected){
      deleteActivityConnected(titleToDelete);
      deleteActivityFun(titleToDelete);
    }else{
      setOnlineQueue(prevQueue => [...prevQueue, ["DELETE", titleToDelete]]);
      deleteActivityFun(titleToDelete);
    }
  };  

  const openActivityInModal = (title, description, date, category, location, feedback, id) => {
    setSelectedActivity(() => {
      const updatedActivity = {
        title: title,
        description: description,
        date: date,
        category: category,
        location: location,
        feedback: feedback,
        id: id
      };
      return updatedActivity;
    });
  
    toggleModal();
  };
  
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={activities}
        numColumns={2}
        renderItem={(activityData) => {
          return (
            <View style={styles.itemContainer} onTouchEnd={() => 
              openActivityInModal(
                activityData.item.title,
                activityData.item.description,
                activityData.item.date,
                activityData.item.category,
                activityData.item.location,
                activityData.item.feedback,
                activityData.item.id
              )
            }>
              <Text>Title: {activityData.item.title}</Text>
              <Text>Date: {activityData.item.date}</Text>
            </View>
          );
        }}
      />

      {isModalVisible && (<ActivityInput
      visible={isModalVisible}
      addActivity={addActivity}
      closeModal={closeModal}
      selectedActivity={selectedActivity}
      updateSelectedActivity={updateSelectedActivity}
      deleteSelectedActivity={deleteSelectedActivity}/>)}

      <View style={styles.buttonDimensions}>
          <Button title="+" onPress={toggleModalAdd} />
      </View>

      <View style={styles.networkButton}>
      <Button title="Network Button" onPress={turnOnOffNetwork} color={isConnected ? 'green' : 'red'}/>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      backgroundColor: 'lightgreen',
      padding: 20, 
      margin: 5,
      borderWidth: 1,
      borderColor: 'gray',
      maxWidth: '47%'
    },
    buttonDimensions:{
        width: 50,
        marginLeft: '43%'
    },
    networkButton: {
      width: '20%',
      position: 'absolute',
      bottom: 0,
      padding: 10,
    }
  });

export default ActivityList;
