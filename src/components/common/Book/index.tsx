import { Text, View, Image, ScrollView } from 'react-native';

import useToken from '@/src/hooks/useToken';
import useGetBook from '@/src/queries/useBookQuery';
import { bookStyles } from '@/src/styles/bookStyles';

function Book() {
  const token = useToken();
  const { data: recommendedBook } = useGetBook(token!);

  return (
    <View style={bookStyles.component}>
      <View style={bookStyles.titleContainer}>
        <Text style={bookStyles.titleText}>오늘의 책 추천</Text>
      </View>
      <View style={bookStyles.container}>
        <View style={bookStyles.contentContainer}>
          <View style={bookStyles.imgContainer}>
            <Image
              source={
                recommendedBook?.coverImageUrl
                  ? { uri: recommendedBook.coverImageUrl }
                  // eslint-disable-next-line @typescript-eslint/no-require-imports
                  : require('@/assets/images/book-and-pencil.png')
              }
              style={
                recommendedBook?.coverImageUrl
                  ? bookStyles.cover
                  : bookStyles.fallbackCover
              }
            />
          </View>
          <>
            {/* eslint-disable-next-line no-constant-condition */}
            {true ? (
              <ScrollView style={bookStyles.infoContainer}>
                <Text style={bookStyles.bookTitle}>{recommendedBook?.title}</Text>
                <Text style={bookStyles.bookAuthor}>저자 | {recommendedBook?.author}</Text>
                <Text style={bookStyles.bookDescription}>소개 | {recommendedBook?.description}</Text>
              </ScrollView>
            ) : (
              <View style={bookStyles.noBookInfo}>
                <Text style={bookStyles.noBookInfoText}>하루를 기록하고</Text>
                <Text style={bookStyles.noBookInfoText}>책을 추천 받아보세요!</Text>
              </View>
            )}
          </>
        </View>
      </View>
    </View>
  );
}

export default Book;
