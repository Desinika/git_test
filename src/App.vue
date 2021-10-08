<template>
<div>
    <div class="container">
        <div class="child">
            <img alt="Aditro Logo" src="./assets/aditro.png" />
        </div>
        <div class="child">
            <div id="nav">
                <router-link to="/login">Login</router-link> |
                <router-link to="/">Search</router-link> |
                <router-link to="/upload">Upload</router-link>
            </div>
        </div>
        <div class="child">
            <img alt="LinkedIn logo" src="./assets/linkedin.png" />
        </div>
    </div>
    <router-view />
</div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.container {
    display: flex;
}

.child {
    flex: 1;
}

.child:first-child {
    margin-right: 20px;
}
</style>
