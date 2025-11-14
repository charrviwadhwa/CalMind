import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ForumsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'Painting & Drawin',
      members: 12500,
      description: 'Share your artwork, get feedback, and learn painting techniques',
      joined: false,
      notifications: true,
    },
    {
      id: 2,
      name: 'Music Lovers',
      members: 34200,
      description: 'Discuss favorite artists, share playlists, and discover new music',
      joined: true,
      notifications: true,
    },
    {
      id: 3,
      name: 'Photography Enthusiasts',
      members: 18700,
      description: 'Share photos, camera tips, and photography techniques',
      joined: false,
      notifications: false,
    },
    {
      id: 4,
      name: 'Gardening Club',
      members: 8900,
      description: 'Exchange gardening tips, plant care advice, and showcase your garden',
      joined: true,
      notifications: true,
    },
    {
      id: 5,
      name: 'Book Readers Society',
      members: 15600,
      description: 'Discuss books, share reviews, and join reading challenges',
      joined: false,
      notifications: false,
    },
    {
      id: 6,
      name: 'Cooking & Baking',
      members: 22300,
      description: 'Share recipes, cooking tips, and culinary creations',
      joined: false,
      notifications: false,
    },
    {
      id: 7,
      name: 'DIY Crafts',
      members: 11200,
      description: 'Creative DIY projects, craft ideas, and handmade creations',
      joined: false,
      notifications: true,
    },
    {
      id: 8,
      name: 'Classical Music',
      members: 7600,
      description: 'Appreciate and discuss classical music compositions and composers',
      joined: false,
      notifications: false,
    },
    {
      id: 9,
      name: 'Pottery & Ceramics',
      members: 5400,
      description: 'Learn pottery techniques and share your ceramic artwork',
      joined: false,
      notifications: false,
    },
    {
      id: 10,
      name: 'Hiking & Outdoor Adventures',
      members: 18900,
      description: 'Share hiking trails, outdoor tips, and adventure stories',
      joined: true,
      notifications: true,
    },
  ]);

  // Filter communities based on search query
  const filteredCommunities = useMemo(() => {
    return communities.filter(community =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, communities]);

  const handleJoinPress = (community) => {
    setSelectedCommunity(community);
    setJoinModalVisible(true);
  };

  const handleJoin = (joinAsNandita = true) => {
    if (selectedCommunity) {
      setCommunities(prev =>
        prev.map(comm =>
          comm.id === selectedCommunity.id
            ? { ...comm, joined: true }
            : comm
        )
      );
      
      Alert.alert(
        'Success!',
        `You have joined "${selectedCommunity.name}" ${joinAsNandita ? 'as Nandita' : 'anonymously'}`,
        [{ text: 'OK' }]
      );
    }
    setJoinModalVisible(false);
  };

  const toggleNotifications = (communityId) => {
    setCommunities(prev =>
      prev.map(comm =>
        comm.id === communityId
          ? { ...comm, notifications: !comm.notifications }
          : comm
      )
    );
  };

  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const CommunityCard = ({ community }) => (
    <View style={styles.communityCard}>
      <View style={styles.communityHeader}>
        <View style={styles.communityIcon}>
          <Text style={styles.communityIconText}>
            {community.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.communityInfo}>
          <Text style={styles.communityName}>{community.name}</Text>
          <Text style={styles.communityMembers}>
            {formatMemberCount(community.members)} members
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.notificationBell,
            community.notifications && styles.notificationBellActive
          ]}
          onPress={() => toggleNotifications(community.id)}
        >
          <Ionicons
            name={community.notifications ? "notifications" : "notifications-outline"}
            size={24}
            color={community.notifications ? "#007AFF" : "#666"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.communityDescription}>
        {community.description}
      </Text>

      <View style={styles.communityFooter}>
        {community.joined ? (
          <View style={styles.joinedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.joinedText}>Joined</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleJoinPress(community)}
          >
            <Text style={styles.joinButtonText}>Join Community</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E3F2FD" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Communities</Text>
        <Text style={styles.headerSubtitle}>Find and join communities that interest you</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search communities..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Communities List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))
        ) : (
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={64} color="#BBDEFB" />
            <Text style={styles.noResultsText}>No communities found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search terms
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Join Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={joinModalVisible}
        onRequestClose={() => setJoinModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Join Community</Text>
            <Text style={styles.modalSubtitle}>
              How would you like to join "{selectedCommunity?.name}"?
            </Text>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.joinAsNandita]}
              onPress={() => handleJoin(true)}
            >
              <Ionicons name="person" size={24} color="#fff" />
              <Text style={styles.modalButtonText}>Join as Nandita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.joinAnonymously]}
              onPress={() => handleJoin(false)}
            >
              <Ionicons name="eye-off" size={24} color="#fff" />
              <Text style={styles.modalButtonText}>Join Anonymously</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setJoinModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#42A5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  communityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#42A5F5',
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  communityIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
  },
  communityMembers: {
    fontSize: 14,
    color: '#42A5F5',
  },
  notificationBell: {
    padding: 8,
    borderRadius: 20,
  },
  notificationBellActive: {
    backgroundColor: '#E3F2FD',
  },
  communityDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  communityFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  joinButton: {
    backgroundColor: '#42A5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  joinedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinedText: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1565C0',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#42A5F5',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  joinAsNandita: {
    backgroundColor: '#42A5F5',
  },
  joinAnonymously: {
    backgroundColor: '#666',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForumsPage;