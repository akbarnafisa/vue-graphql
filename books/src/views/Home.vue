<template>
  <div>
    <BookList
      :books="books"
      :loading="$apollo.queries.books.loading"
    ></BookList>
    <AddBook></AddBook>
  </div>
</template>

<script>
// @ is an alias to /src

import BookList from "@/components/BookList";
import AddBook from "@/components/AddBook";

import { BOOKS_QUERY } from "@/graphql";

export default {
  name: "home",
  components: {
    BookList,
    AddBook
  },
  data() {
    return {
      books: []
    };
  },
  apollo: {
    // fetch all users
    books: {
      query: BOOKS_QUERY
    }
  }
};
</script>
