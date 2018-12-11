<template>
  <form id="add-book" @submit.prevent="SUBMIT_FORM">
     <div className="field">
      <label>Book name:</label>
      <input
        v-model="name"
        type="text"
      />
    </div>
    <div className="field">
      <label>Genre:</label>
      <input
         v-model="genre"
        type="text"/>
    </div>
    <div className="field">
      <label>Author:</label>
      <select
        @change="authorId = $event.target.value"
        :value="authorId"
      >
        <option value="">Select author</option>
        <option v-if="authors === null" disabled>Loading authors</option>
        <option
          v-for="(author) in authors"
          :value="author.id"
          :key="author.id">
          {{author.name}}
        </option>
      </select>
    </div>
    <button>+</button> 
  </form>
</template>

<script>
import { AUTHORS_QUERY, ADD_BOOK, BOOKS_QUERY } from "@/graphql";

export default {
  data() {
    return {
      authors: null,
      authorId: "",
      name: "",
      genre: ""
    };
  },
  methods: {
    SUBMIT_FORM() {
      this.$apollo
        .mutate({
          mutation: ADD_BOOK,
          variables: {
            name: this.name,
            genre: this.genre,
            authorId: this.authorId
          },
          update: (store, { data: { addBook } }) => {
            const data = store.readQuery({ query: BOOKS_QUERY });
            data.books.push(addBook);
            store.writeQuery({ query: BOOKS_QUERY, data });
          }
        })
        .then(response => {
          this.name = "";
          this.genre = "";
          this.authorId = "";
        });
    }
  },
  apollo: {
    // fetch all users
    authors: {
      query: AUTHORS_QUERY
    }
  }
};
</script>

<style scoped>
</style>