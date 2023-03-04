<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div class="container-md">
            <router-link class="navbar-brand" to="/">Omnipotent</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            工具箱
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link to="/passwordGenerator" class="dropdown-item"> 密碼產生器 </router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">QR Code 產生器</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">計算機</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">氣象 APP</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">翻譯 APP</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">打字測試</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">虛擬貨幣匯率</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            遊樂場
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link to="" class="dropdown-item">圈圈叉叉</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">俄羅斯方塊</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">擲骰子</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item">翻牌遊戲</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>

<style lang="scss">
#app {
    font-family: SweiGothicCJKtc-Regular;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
}
</style>
