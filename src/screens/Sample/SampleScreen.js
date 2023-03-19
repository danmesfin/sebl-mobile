import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IonicIcons from 'react-native-vector-icons/Ionicons';

const SampleScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sample Screen</Text>
        <TouchableOpacity style={styles.searchButton}>
          <IonicIcons name="search" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.bodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat
          tristique orci, ac placerat metus lacinia vel. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas.
        </Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Tab 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#379237',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    color: '#212121',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#FAFAFA',
    padding: 8,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bodyText: {
    color: '#212121',
    fontSize: 16,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#54B435',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#795548',
    padding: 16,
  },
  tab: {
    padding: 8,
  },
  activeTab: {
    backgroundColor: '#54B435',
    borderRadius: 16,
  },
  tabText: {
    color: '#F0FF42',
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
});

export default SampleScreen;
