export const mockPosts = [
  {
    title: 'Movie Review',
    author: '64591cf96b7f6ac983dc7ee1',
    reviewedItem: 'Avengers: Endgame',
    group: 'Movies',
    tags: [],
    content: 'This is a review of the movie Avengers: Endgame.',
    imageUrl: 'https://example.com/movie-image.jpg',
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
    content: 'This is a review of the book To Kill a Mockingbird.',
    imageUrl: 'https://example.com/book-image.jpg',
    grade: 9,
    likes: new Map([
      ['user1', true],
      ['user2', true],
    ]),
  },
];
