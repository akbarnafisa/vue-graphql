<template>
  <div>
    <div v-if="book === null">No book selected...</div>
    <div v-else>
        
      <h2>name: {{book.name}}</h2>
      <p>genre: {{book.genre}}</p>
      <p>author: {{book.author.name}}</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        <li 
          v-for="(authorBook, index) in book.author.books"
          :key="authorBook + index"
        >
          {{authorBook.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BOOK_QUERY } from "@/graphql";

export default {
  props: {
    bookId: { type: String }
  },
  data() {
    return {
      book: null
    };
  },
  apollo: {
    // fetch user by ID
    book: {
      query: BOOK_QUERY,
      variables() {
        return {
          id: this.bookId
        };
      }
    }
  }
};
</script>

<style scoped>
</style>