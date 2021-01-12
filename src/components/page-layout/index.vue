<template>
  <div>
    <header>
      <a href="/" class="logo">Vue-Store</a>
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
    <div class="footer">
      <div class="shell">
        <p class="lf">
          Copyright &copy; 2020 <a href="#">Vue-Store</a> - All Rights Reserved
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* Header CSS */
header {
  overflow: hidden;
  padding: 0 50px;
}

header a {
  float: left;
  color: rgb(224, 165, 109);
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
  background-color: white;
  opacity: 10%;
  color: white;
}

header .header-right {
  float: right;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20;
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