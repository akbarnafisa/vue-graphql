<template>
  <div>
    <h1>Reading List</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li 
        v-for="(book, index) in books"
        @click="FETCH_BOOK(index, book.id)"
        :key="book.id"
      >{{book.name}}
      <BookDetails
          v-if="bookId[index].isOpen"
          :bookId="bookId[index].id"
        ></BookDetails>
      </li>
    </ul>
    
  </div>
</template>

<script>
import Vue from "vue";
import BookDetails from "./BookDetails";
export default {
  props: {
    books: { type: Array, required: true },
    loading: { type: Boolean, required: true }
  },
  data() {
    return {
      bookId: [],
      cat: ["wew"]
    };
  },
  watch: {
    books(newVal, oldVal) {
      if (newVal.length > 0) {
        this.CREATE_ARRAY();
      }
    }
  },
  created() {
    this.CREATE_ARRAY();
  },
  methods: {
    CREATE_ARRAY() {
      this.bookId = this.books.map(book => {
        return {
          isOpen: false,
          id: null
        };
      });
    },
    FETCH_BOOK(index, id) {
      Vue.set(this.bookId, index, {
        isOpen: !this.bookId[index].isOpen,
        id
      });

      console.log(this.bookId);
    }
  },
  components: {
    BookDetails
  }
};
</script>

<style scoped>
</style>