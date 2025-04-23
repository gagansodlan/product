import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Star, ThumbsUp } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { ProductReview } from '@/types';

interface ReviewCardProps {
  review: ProductReview;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const colors = useThemeStore(state => state.colors);
  const [helpful, setHelpful] = React.useState(review.helpful);
  const [userMarkedHelpful, setUserMarkedHelpful] = React.useState(false);
  
  const handleHelpful = () => {
    if (!userMarkedHelpful) {
      setHelpful(helpful + 1);
      setUserMarkedHelpful(true);
    } else {
      setHelpful(helpful - 1);
      setUserMarkedHelpful(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {review.userAvatar ? (
            <Image 
              source={{ uri: review.userAvatar }} 
              style={styles.avatar} 
            />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>
                {review.userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          
          <View>
            <Text style={[styles.userName, { color: colors.text }]}>
              {review.userName}
            </Text>
            <Text style={[styles.date, { color: colors.secondaryText }]}>
              {formatDate(review.date)}
            </Text>
          </View>
        </View>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star}
              size={16}
              color={colors.warning}
              fill={star <= review.rating ? colors.warning : 'none'}
            />
          ))}
        </View>
      </View>
      
      {review.title && (
        <Text style={[styles.title, { color: colors.text }]}>
          {review.title}
        </Text>
      )}
      
      <Text style={[styles.comment, { color: colors.text }]}>
        {review.comment}
      </Text>
      
      {review.images && review.images.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}
        >
          {review.images.map((image, index) => (
            <Image 
              key={index}
              source={{ uri: image }}
              style={styles.reviewImage}
            />
          ))}
        </ScrollView>
      )}
      
      <TouchableOpacity 
        style={styles.helpfulButton}
        onPress={handleHelpful}
      >
        <ThumbsUp 
          size={16} 
          color={userMarkedHelpful ? colors.primary : colors.secondaryText}
          fill={userMarkedHelpful ? colors.primary : 'none'}
        />
        <Text 
          style={[
            styles.helpfulText, 
            { 
              color: userMarkedHelpful ? colors.primary : colors.secondaryText 
            }
          ]}
        >
          Helpful ({helpful})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 14,
    marginLeft: 6,
  },
});