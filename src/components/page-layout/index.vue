<template>
  <div>
    <header>
      <a href="/" class="logo">SoftUni IMDB</a>
      <div class="header-right">
        <span>
          <a href="/movie/create">Create</a>
          <a href="#">Welcome testuser!</a>
          <a href="#">Logout</a>
          <!-- <a href="/register">Register</a>
              <a href="/login">Login</a> -->
        </span>
      </div>
    </header>
    <slot></slot>
    <footer><h4>SoftUni 2020</h4></footer>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* Header CSS */
header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 0 50px;
}

header a {
  float: left;
  color: black;
  text-align: center;
  padding: 18px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
}

header a.logo {
  font-size: 25px;
  font-weight: bold;
}

header a:hover {
  background-color: dodgerblue;
  color: white;
}

header .header-right {
  float: right;
}

@media screen and (max-width: 500px) {
  header a {
    float: none;
    display: block;
    text-align: left;
  }

  header-right {
    float: none;
  }
}
</style>