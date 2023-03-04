<template>
    <nav class="navbar navbar-dark navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
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
                                <router-link to="/passwordGenerator" class="dropdown-item">密碼產生器</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">QR Code 產生器（待完成）</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">計算機（待完成）</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">氣象 APP（待完成）</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">翻譯 APP（待完成）</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">打字測試（待完成）</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">虛擬貨幣匯率（待完成）</router-link>
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
                                <router-link to="" class="dropdown-item disabled">圈圈叉叉（待完成）</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">俄羅斯方塊（待完成）</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">擲骰子（待完成）</router-link>
                            </li>
                            <li>
                                <router-link to="" class="dropdown-item disabled">翻牌遊戲（待完成）</router-link>
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
