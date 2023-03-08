<template>
    <section class="container-md mx-auto py-3">
        <nav
            style="
                --bs-breadcrumb-divider: url(
                    &#34;data:image/svg + xml,
                    %3Csvgxmlns='http://www.w3.org/2000/svg'width='8'height='8'%3E%3Cpathd='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z'fill='%236c757d'/%3E%3C/svg%3E&#34;
                );
            "
            aria-label="breadcrumb"
        >
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/" class="link-secondary">首頁</router-link></li>
                <li class="breadcrumb-item"><router-link to="" class="link-secondary">工具箱</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">
                    <router-link to="/calculator" class="link-dark">計算機</router-link>
                </li>
            </ol>
        </nav>
        <div class="view d-flex justify-content-center align-items-center">
            <div class="application">
                <h2>計算機</h2>
                <div class="app-wrapper">
                    <span v-if="error" class="error" v-cloak>{{ error }}</span>
                    <input type="text" class="showValue" v-model="currentValue" disabled />
                    <div class="btns">
                        <button v-for="num in 9" :key="num" @click="keyNumber(num)" v-cloak>{{ num }}</button>
                        <button @click="keyNumber(0)">0</button>
                        <button @click="setOperator(add)" class="operators">+</button>
                        <button @click="setOperator(subtract)" class="operators">−</button>
                        <button @click="setOperator(multiple)" class="operators">×</button>
                        <button @click="setOperator(divide)" class="operators">÷</button>
                        <button @click="addDecimal">.</button>
                        <button @click="clear">AC</button>
                        <button @click="backspace">←</button>
                        <button @click="calculate" class="operators">=</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            currentValue: "0",
            previousValue: "",
            operator: null,
            operatorClicked: false,
            equalPressed: false,
            error: "",
        };
    },
    methods: {
        keyNumber(number) {
            if (this.operatorClicked) {
                this.currentValue = "";
            }
            if (this.equalPressed) {
                this.error = "請點擊運算符號繼續計算";
                return;
            }
            this.operatorClicked = false;
            this.currentValue = this.currentValue === "0" ? `${number}` : `${this.currentValue}${number}`;
        },
        setOperator(operatorFunc) {
            if (this.equalPressed) {
                this.equalPressed = false;
                this.error = "";
            }
            // 如果已經有一個運算符號存在，先計算出結果
            if (this.operator !== null) {
                this.calculate();
                this.equalPressed = false;
            }
            this.operator = operatorFunc;
            this.previousValue = this.currentValue;
            this.operatorClicked = true;
        },
        addDecimal() {
            if (this.currentValue.includes(".")) {
                return;
            }
            this.currentValue += ".";
        },
        clear() {
            this.currentValue = "0";
            this.previousValue = "";
            this.operator = null;
            this.operatorClicked = false;
            this.equalPressed = false;
            this.error = "";
        },
        backspace() {
            this.currentValue = this.currentValue.slice(0, -1);
            if (this.currentValue === "") {
                this.currentValue = "0";
            }
        },
        calculate() {
            const previous = parseFloat(this.previousValue);
            const current = parseFloat(this.currentValue);
            if (isNaN(previous) || isNaN(current)) {
                return;
            }
            // 判斷除數為零的情況
            if (this.operator === this.divide && current === 0) {
                this.error = "除數不能為零";
                this.currentValue = "0";
                return;
            }
            this.currentValue = `${this.operator(previous, current)}`;
            this.currentValue = parseFloat(this.currentValue)
                .toFixed(10)
                .replace(/\.?0+$/, "");
            this.operator = null;
            this.operatorClicked = false;
            this.equalPressed = true;
            this.error = "";
        },
        add(a, b) {
            return a + b;
        },
        subtract(a, b) {
            return a - b;
        },
        multiple(a, b) {
            return a * b;
        },
        divide(a, b) {
            return a / b;
        },
    },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
    display: none;
}
.container-md {
    height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;
    .view {
        flex-grow: 1;

        .application {
            width: fit-content;
            background-color: #fff;
            border-radius: 0.5rem;
            border: 1px solid #d4dbe5;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);

            h2 {
                font-weight: 600;
                font-size: 1.31rem;
                padding: 1rem 1.75rem;
                margin-bottom: 0;
                border-bottom: 1px solid #d4dbe5;
                text-align: center;
            }

            .app-wrapper {
                position: relative;
                padding: 2rem 1.75rem 1.25rem;
                box-sizing: border-box;

                .error {
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: block;
                    padding: 0 1.75rem;
                    width: 100%;
                    text-align: right;
                    font-size: 0.75rem;
                    line-height: 2rem;
                    color: IndianRed;
                }

                .showValue {
                    width: 15rem;
                    height: 3.75rem;
                    line-height: 3.75rem;
                    color: #000;
                    background: none;
                    font-size: 1.25rem;
                    font-weight: 500;
                    letter-spacing: 1.4px;
                    border-radius: 0.5rem;
                    border: 1px solid #aaa;
                    padding: 0 1rem;
                    text-align: right;
                    margin-bottom: 1.5rem;
                }

                .btns {
                    display: grid;
                    grid-template-columns: repeat(4, 3rem);
                    grid-template-rows: repeat(5, 3rem);
                    gap: 1rem;

                    button {
                        padding: 0.5rem;
                        outline: none;
                        border: none;
                        border-radius: 0.5rem;
                        background-color: Gainsboro;
                        font-size: 1.1rem;

                        &:hover {
                            border: 1px solid #aaa;
                            box-shadow: 0 0 10px #0002;
                            transform: scale(1.05);
                        }

                        &:nth-child(1) {
                            grid-area: 3 / 1 / 4 / 2;
                        }

                        &:nth-child(2) {
                            grid-area: 3 / 2 / 4 / 3;
                        }

                        &:nth-child(3) {
                            grid-area: 3 / 3 / 4 / 4;
                        }

                        &:nth-child(4) {
                            grid-area: 2 / 1 / 3 / 2;
                        }

                        &:nth-child(5) {
                            grid-area: 2 / 2 / 3 / 3;
                        }

                        &:nth-child(6) {
                            grid-area: 2 / 3 / 3 / 4;
                        }

                        &:nth-child(7) {
                            grid-area: 1 / 1 / 2 / 2;
                        }

                        &:nth-child(8) {
                            grid-area: 1 / 2 / 2 / 2;
                        }

                        &:nth-child(9) {
                            grid-area: 1 / 3 / 2 / 3;
                        }

                        &:nth-child(10) {
                            grid-area: 4 / 1 / 5 / 3;
                        }

                        &:nth-child(11) {
                            grid-area: 4 / 4 / 5 / 5;
                        }

                        &:nth-child(12) {
                            grid-area: 3 / 4 / 4 / 5;
                        }

                        &:nth-child(13) {
                            grid-area: 2 / 4 / 3 / 5;
                        }

                        &:nth-child(14) {
                            grid-area: 1 / 4 / 2 / 5;
                        }

                        &:nth-child(15) {
                            grid-area: 4 / 3 / 5 / 4;
                        }

                        &:nth-child(16) {
                            grid-area: 5 / 1 / 6 / 3;
                        }

                        &:nth-child(17) {
                            grid-area: 5 / 3 / 6 / 4;
                        }

                        &:nth-child(18) {
                            grid-area: 5 / 4 / 6 / 5;
                        }
                    }

                    .operators {
                        background-color: #43a047;
                        color: #fff;

                        &:hover {
                            background-color: DarkSalmon;
                            border-color: DarkSalmon;
                        }
                    }
                }
            }
        }
    }
}
</style>
