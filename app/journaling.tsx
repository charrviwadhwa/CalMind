import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import the gradient component

// --- Constants ---
const PRIMARY_COLOR = '#000000'; // Black text/icons
const INACTIVE_TEXT_COLOR = '#666666'; // Gray for note count and numbers
const FONT_FAMILY = Platform.OS === 'ios' ? 'System' : 'sans-serif'; 

// Gradient Colors (Soft Blue to Mint Green)
const GRADIENT_COLORS = ['#E6E9F0', '#E0F4E8']; // Light Blue/Lavender to Light Mint Green

// Define the structure for a Journal Folder
interface JournalFolder {
    id: string;
    number: string;
    title: string;
    noteCount: number;
}

// Mock Data for the Journal Folders list
const JOURNAL_FOLDERS: JournalFolder[] = [
    { id: '1', number: '01', title: 'Personal Notes', noteCount: 12 },
    { id: '2', number: '02', title: 'Educational', noteCount: 20 },
    { id: '3', number: '03', title: 'Daily Journal', noteCount: 34 },
    { id: '4', number: '04', title: 'Ideas & Brainstorming', noteCount: 12 },
    { id: '5', number: '05', title: 'Work Projects', noteCount: 34 },
    { id: '6', number: '06', title: 'Grocery Lists', noteCount: 5 },
    { id: '7', number: '07', title: 'Books to Read', noteCount: 8 },
];

// --- Component for a single folder item ---
const FolderItem: React.FC<{ item: JournalFolder }> = ({ item }) => (
    <TouchableOpacity style={styles.folderItem}>
        <View style={styles.numberContainer}>
            <Text style={styles.folderNumber}>{item.number}</Text>
        </View>
        <View style={styles.folderDetails}>
            <Text style={styles.folderTitle}>{item.title}</Text>
            <Text style={styles.folderCount}>{item.noteCount} notes</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color={INACTIVE_TEXT_COLOR} />
    </TouchableOpacity>
);

// --- Main Screen Component ---
export default function JournalFoldersScreen() {
    return (
        <LinearGradient 
            colors={GRADIENT_COLORS} 
            style={styles.gradientBackground}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    
                    {/* --- Header (Menu, Title, Add Button) --- */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.menuButton}>
                            <Text style={styles.menuText}>MENU</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="add-circle-outline" size={30} color={PRIMARY_COLOR} />
                        </TouchableOpacity>
                    </View>

                    {/* --- Main Title --- */}
                    <Text style={styles.screenTitle}>All Folders</Text>
                    <Text style={styles.subtitle}>This Month</Text>

                    {/* --- Folder List --- */}
                    <FlatList
                        data={JOURNAL_FOLDERS}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <FolderItem item={item} />}
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}
const { height } = Dimensions.get('window');
// --- Styles ---
const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1, // Makes the gradient fill the entire screen
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent', // Crucial to let the gradient show
    },
    container: {
        flex: 1,
        minHeight:height,
        paddingHorizontal: 25,
        paddingTop: Platform.OS === 'android' ? 15 : 0,
        backgroundColor: 'transparent', // Crucial to let the gradient show
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent white button
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    menuText: {
        fontSize: 14,
        fontWeight: '600',
        color: PRIMARY_COLOR,
        fontFamily: FONT_FAMILY,
    },
    screenTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        color: PRIMARY_COLOR,
        fontFamily: FONT_FAMILY,
    },
    subtitle: {
        fontSize: 16,
        color: INACTIVE_TEXT_COLOR,
        marginBottom: 30,
        fontFamily: FONT_FAMILY,
    },
    list: {
        flex: 1,
    },
    // --- Folder Item Styles ---
    folderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.08)', // Very subtle, semi-transparent separator line
    },
    numberContainer: {
        width: 30,
    },
    folderNumber: {
        fontSize: 18,
        fontWeight: '300', 
        color: INACTIVE_TEXT_COLOR,
        fontFamily: FONT_FAMILY,
    },
    folderDetails: {
        flex: 1,
        marginLeft: 15,
    },
    folderTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: PRIMARY_COLOR,
        fontFamily: FONT_FAMILY,
    },
    folderCount: {
        fontSize: 14,
        color: INACTIVE_TEXT_COLOR,
        marginTop: 2,
        fontFamily: FONT_FAMILY,
    },
});