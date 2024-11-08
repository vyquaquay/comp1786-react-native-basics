import { useEffect, useState } from 'react';
import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";
import { FlatList, Text, TextInput, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';  // Importing the icon

const UseClassesData = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch classes from Firebase and store them in state
  useEffect(() => {
    const classesRef = ref(database, "classes/");
    onValue(classesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const classList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setClasses(classList);
        setFilteredClasses(classList); // Initially display all classes
      }
    });
  }, []);

  // Handle search by teacher or day of the week
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = classes.filter((item) => {
      const teacherMatch = item.teacher.toLowerCase().includes(lowercasedQuery);
      const dayMatch = item.dayOfWeek.toLowerCase().includes(lowercasedQuery);
      const typeMatch = item.typeOfCourse.toLowerCase().includes(lowercasedQuery);
      return teacherMatch || dayMatch || typeMatch;
    });
    setFilteredClasses(filtered); // Update the list with filtered results
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by teacher or day of week"
          placeholderTextColor="#888" // Gray placeholder text for contrast
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {/* Display the classes */}
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.classItem}>
            <View style={styles.classRow}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{item.date}</Text>
            </View>
            <View style={styles.classRow}>
              <Text style={styles.label}>Day of Week:</Text>
              <Text style={styles.value}>{item.dayOfWeek}</Text>
            </View>
            <View style={styles.classRow}>
              <Text style={styles.label}>Teacher:</Text>
              <Text style={styles.value}>{item.teacher}</Text>
            </View>
            <View style={styles.classRow}>
              <Text style={styles.label}>Comment:</Text>
              <Text style={styles.value}>{item.comment}</Text>
            </View>
            <View style={styles.classRow}>
              <Text style={styles.label}>typeOfCourse: </Text>
              <Text style={styles.value}>{item.typeOfCourse}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#39FF14',  // Neon green border color
    paddingLeft: 10,
    paddingRight: 1,
  },
  searchIcon: {
    marginRight: 10,  // Space between icon and input field
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff', // Keeping the background white
    borderRadius: 8,
    color: '#000',  // Black text color for better contrast
    paddingLeft: 5,
  },
  classItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  classRow: {
    flexDirection: 'row',
    marginBottom: 5, // Reduced margin to bring elements closer
  },
  label: {
    fontWeight: 'bold',
    width: 120, // Fixed width for labels to align them
    marginRight: 5, // Reduced space between label and value
  },
  value: {
    flex: 1, // Value will take up remaining space
    textAlign: 'right', // Align the value to the right for a clean look
  },
});
export default UseClassesData;
