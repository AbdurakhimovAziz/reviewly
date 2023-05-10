export const mockPosts = [
  {
    title: 'Movie Review',
    author: '64591cf96b7f6ac983dc7ee1',
    reviewedItem: 'Avengers: Endgame',
    group: 'Movies',
    tags: [],
    body: 'This is a review of the movie Avengers: Endgame.',
    imageUrl:
      'https://res.cloudinary.com/dwx3ott96/image/upload/v1626430228/images/pineapple_yna0xl.png',
    grade: 8,
    likes: new Map([
      ['user1', true],
      ['user2', true],
      ['user3', false],
    ]),
  },
  {
    title: 'Book Review',
    author: '64591cf96b7f6ac983dc7ee1',
    reviewedItem: 'To Kill a Mockingbird',
    group: 'Books',
    tags: [],
    body: 'This is a review of the book To Kill a Mockingbird.',
    imageUrl:
      'https://res.cloudinary.com/dwx3ott96/image/upload/v1626430226/images/orange_eekkip.png',
    grade: 9,
    likes: new Map([
      ['user1', true],
      ['user2', true],
    ]),
  },
];
