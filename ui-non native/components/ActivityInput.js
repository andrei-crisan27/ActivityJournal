import { Alert, Button, Modal, TextInput, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

function ActivityInput({visible, addActivity, closeModal, selectedActivity, updateSelectedActivity, deleteSelectedActivity}) {
    const [isModalVisible, setVisibility] = useState(visible)
    const [activityTitle, setActivityTitle] = useState('')
    const [activityDescription, setActivityDescription] = useState('')
    const [activityDate, setActivityDate] = useState('')
    const [activityCategory, setActivityCategory] = useState('')
    const [activityLocation, setActivityLocation] = useState('')
    const [activityFeedback, setActivityFeedback] = useState('')
    const [activityId, setActivityId] = useState('')

    useEffect(() => {
        if (selectedActivity) {
            setActivityTitle(selectedActivity.title || '');
            setActivityDate(selectedActivity.date || '');
            setActivityDescription(selectedActivity.description || '')
            setActivityCategory(selectedActivity.category || '')
            setActivityLocation(selectedActivity.location || '')
            setActivityFeedback(selectedActivity.feedback || '')
            setActivityId(selectedActivity.id || '')
        }
      }, [selectedActivity]);
      

    const setTitle = (enteredText) => {
        setActivityTitle(enteredText)
    }
    const setDescription = (enteredText) => {
        setActivityDescription(enteredText)
    }
    const setDate = (enteredText) => {
        setActivityDate(enteredText)
    }
    const setCategory = (enteredText) => {
        setActivityCategory(enteredText)
    }
    const setLocation = (enteredText) => {
        setActivityLocation(enteredText)
    }
    const setFeedback = (enteredText) => {
        setActivityFeedback(enteredText)
    }

    function handleAddActivity() {
        addActivity({
            title: activityTitle,
            description: activityDescription,
            date: activityDate,
            category: activityCategory,
            location: activityLocation,
            feedback: activityFeedback
        });
    }

    const handleUpdateActivity = () => {
        updateSelectedActivity({
          title: activityTitle,
          description: activityDescription,
          date: activityDate,
          category: activityCategory,
          location: activityLocation,
          feedback: activityFeedback,
          id: activityId
        });
    };

    const handleDeleteActivity = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this activity?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => deleteSelectedActivity(activityTitle),
              },
            ],
            { cancelable: false }
          );
    }

    return(
        <Modal visible={isModalVisible} animationType="slide">
            <View style={styles.container}>
                <TextInput style={styles.input}
                placeholder="Add a title: "
                onChangeText={setTitle}
                value={activityTitle}/>
                <TextInput style={styles.input}
                placeholder="Add a description: "
                onChangeText={setDescription}
                value={activityDescription}/>
                <TextInput style={styles.input}
                placeholder="Add a date and time: "
                onChangeText={setDate}
                value={activityDate}/>
                <TextInput style={styles.input}
                placeholder="Add a category: "
                onChangeText={setCategory}
                value={activityCategory}/>
                <TextInput style={styles.input}
                placeholder="Add a location: "
                onChangeText={setLocation}
                value={activityLocation}/>
                <TextInput style={styles.input}
                placeholder="Add a feedback: "
                onChangeText={setFeedback}
                value={activityFeedback}/>
                <View style={styles.buttonContainer}>
                    {selectedActivity === null && (<Button style={styles.button} title="Add Activity" onPress={handleAddActivity} />)}
                    {selectedActivity !== null && (<Button style={styles.button} title="Update Activity" onPress={handleUpdateActivity} />)}
                    {selectedActivity !== null && (<Button style={styles.button} title="Delete Activity" onPress={handleDeleteActivity} />)}
                    <Button title="Close" onPress={closeModal}></Button>
                </View>
            </View>
        </Modal>
    )
}

export default ActivityInput;

const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
      marginRight: 25
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
    },
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: 'lightyellow'
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
  });
  