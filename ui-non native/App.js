import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ActivityList from './components/ActivityList';

export default function App() {

  return (
    <View style={styles.container}>
      <ActivityList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: 'lightyellow'
  },
});
