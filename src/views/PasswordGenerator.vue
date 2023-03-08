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
                    <router-link to="/passwordGenerator" class="link-dark">密碼產生器</router-link>
                </li>
            </ol>
        </nav>
        <div class="view d-flex justify-content-center align-items-center">
            <div class="application">
                <h2 class="title">密碼產生器</h2>
                <div class="app-wrapper">
                    <div class="input-box">
                        <input type="text" ref="pwInput" v-model="password" disabled />
                        <span class="material-symbols-rounded" ref="copy" v-cloak @click="copyPassword">copy_all</span>
                    </div>
                    <div class="pw-indicator" ref="pwIndicator" :id="strength"></div>
                    <div class="pw-length">
                        <div class="details">
                            <label class="title">密碼長度</label>
                            <span v-cloak>{{ passwordLength }}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            ref="slider"
                            v-model="passwordLength"
                            @input="generatePassword"
                        />
                    </div>
                    <div class="pw-settings">
                        <p class="title">密碼設定</p>
                        <ul class="options">
                            <li class="option" v-for="option in options" :key="option.id" v-cloak>
                                <input type="checkbox" :id="option.id" v-model="option.checked" />
                                <label :for="option.id">{{ option.label }}</label>
                            </li>
                        </ul>
                    </div>
                    <button class="generate-btn" ref="generateBtn" @click="generatePassword">
                        產生密碼<span class="material-symbols-rounded">refresh</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            characters: {
                lowercase: "abcdefghijklmnopqrstuvwxyz",
                uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                numbers: "0123456789",
                symbols: "!?$&|<>()[]{}:;.,+-*/@~",
            },
            options: [
                {
                    id: "lowercase",
                    label: "包含小寫字母 (a - z)",
                    checked: true,
                },
                {
                    id: "uppercase",
                    label: "包含大寫字母 (A - Z)",
                    checked: false,
                },
                {
                    id: "numbers",
                    label: "包含數字 (0 - 9)",
                    checked: false,
                },
                {
                    id: "symbols",
                    label: "包含標點符號 (!@#$&*)",
                    checked: false,
                },
                {
                    id: "spaces",
                    label: "包含空格",
                    checked: false,
                },
                {
                    id: "exc-duplicate",
                    label: "排除重複字元",
                    checked: false,
                },
            ],
            password: "",
            passwordLength: 8,
            passwordStrength: "",
        };
    },
    computed: {
        strength() {
            let score = this.passwordLength;
            if (/[A-Z]/.test(this.password)) score *= 1.25;
            if (/[a-z]/.test(this.password)) score *= 1.25;
            if (/[0-9]/.test(this.password)) score *= 1.25;
            if (/[^A-Za-z0-9]/.test(this.password)) score *= 1.25;

            if (score > 40) return "perfect";
            if (score > 20) return "great";
            if (score > 10) return "good";
            return "weak";
        },
    },
    methods: {
        generatePassword() {
            // 儲存字元
            let staticPassword = "";
            // 隨機密碼
            let randomPassword = "";
            // 是否排除重複字元
            let excludeDuplicate = false;

            this.options.forEach((option) => {
                // 如果勾選該選項
                if (option.checked) {
                    if (option.id === "spaces") {
                        // 新增空格 --> 有一定機率隨機選到空格字元
                        staticPassword += `  ${staticPassword}  `;
                    } else if (option.id === "exc-duplicate") {
                        excludeDuplicate = true;
                    } else {
                        // 根據選中選項，將對應字元儲存至 staticPassword
                        staticPassword += this.characters[option.id];
                    }
                }
            });

            for (let i = 0; i < this.passwordLength; i++) {
                // 從 staticPassword 中隨機選取字元
                let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

                // 排除重複字元
                if (excludeDuplicate) {
                    // 檢查 randomChar 是否已經在 randomPassword 中出現或是否為空格
                    // 如若有其中之一成立，則 i 減一 --> 重新執行一次
                    !randomPassword.includes(randomChar) || randomChar == " " ? (randomPassword += randomChar) : i--;
                } else {
                    randomPassword += randomChar;
                }

                this.password = randomPassword;
            }
        },
        copyPassword() {
            const copy = this.$refs.copy;

            navigator.clipboard.writeText(this.password);
            copy.innerHTML = "check";
            copy.style.color = "#4285f4";

            setTimeout(() => {
                copy.innerText = "copy_all";
                copy.style.color = "#707070";
            }, 1500);
        },
    },
    mounted() {
        this.generatePassword();
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
            width: 450px;
            background-color: #fff;
            border-radius: 0.5rem;
            border: 1px solid #d4dbe5;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);

            h2 {
                font-weight: 600;
                font-size: 1.31rem;
                padding: 1rem 1.75rem;
                border-bottom: 1px solid #d4dbe5;
                text-align: center;
            }

            .app-wrapper {
                margin: 1.25rem 1.75rem;

                .input-box {
                    position: relative;

                    input {
                        width: 100%;
                        height: 53px;
                        line-height: 53px;
                        color: #000;
                        background: none;
                        font-size: 1.06rem;
                        font-weight: 500;
                        letter-spacing: 1.4px;
                        border-radius: 0.25rem;
                        border: 1px solid #aaa;
                        padding: 0 2.85rem 0 1rem;
                    }

                    span {
                        position: absolute;
                        right: 13px;
                        line-height: 53px;
                        color: #707070;
                        cursor: pointer;

                        &:hover {
                            color: #43a047;
                        }
                    }
                }

                .pw-indicator {
                    width: 100%;
                    height: 4px;
                    position: relative;
                    margin-top: 0.75rem;
                    border-radius: 25px;

                    &::before {
                        position: absolute;
                        content: "";
                        height: 100%;
                        width: 50%;
                        border-radius: inherit;
                        transition: width 0.3s ease;
                    }

                    &#weak::before {
                        width: 25%;
                        background-color: #e64a4a;
                    }

                    &#good::before {
                        width: 50%;
                        background-color: #eb892a;
                    }

                    &#great::before {
                        width: 75%;
                        background-color: #f1c80b;
                    }

                    &#perfect::before {
                        width: 100%;
                        background-color: #43a047;
                    }
                }

                .pw-length {
                    margin: 1.56rem 0 1.25rem;

                    .details {
                        display: flex;
                        justify-content: space-between;
                    }

                    input {
                        width: 100%;
                        height: 5px;
                    }
                }

                .pw-settings {
                    .options {
                        list-style: none;
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 1rem;
                        padding-left: 0;

                        .option {
                            display: flex;
                            align-items: center;
                            margin-bottom: 1rem;
                            width: calc(100% / 2);

                            &:first-child {
                                pointer-events: none;

                                input {
                                    opacity: 0.7;
                                }
                            }

                            input {
                                height: 1rem;
                                width: 1rem;
                                cursor: pointer;
                            }

                            label {
                                padding-left: 0.63rem;
                            }
                        }
                    }
                }
                .generate-btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    margin: 0.94rem 0 1.3rem;
                    padding: 0.94rem 0;
                    color: #fff;
                    background-color: #43a047;
                    font-size: 1.06rem;
                    border: none;
                    border-radius: 5px;
                    outline: none;
                    cursor: pointer;

                    span {
                        font-size: 1.25rem;
                        padding-left: 0.2rem;
                    }
                }
            }
        }
    }
}
</style>
