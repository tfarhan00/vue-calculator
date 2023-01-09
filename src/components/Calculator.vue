<template>
  <div class="main-container">
    <div class="device-container">
      <div class="display-history">{{ $store.state.history._calcinput }}</div>
      <div class="display-container-inner">
        <div class="display-symbol">=</div>
        <input class="display-result" v-model="$store.state.result" type="text" placeholder="0" />
      </div>
      <div class="button-container">
        <div class="button button-clear" @click="clear()">CLEAR</div>
        <div class="button button-operator" @click="addKey('/')">
          <i class="bi bi-slash"></i>
        </div>
        <div class="button button-operator" @click="addKey('*')">
          <i class="bi bi-x"></i>
        </div>
        <div class="button button-number" @click="addKey('1')">1</div>
        <div class="button button-number" @click="addKey('2')">2</div>
        <div class="button button-number" @click="addKey('3')">3</div>
        <div class="button button-operator" @click="addKey('+')">
          <i class="bi bi-plus"></i>
        </div>
        <div class="button button-number" @click="addKey('4')">4</div>
        <div class="button button-number" @click="addKey('5')">5</div>
        <div class="button button-number" @click="addKey('6')">6</div>
        <div class="button button-operator" @click="addKey('-')">
          <i class="bi bi-dash"></i>
        </div>
        <div class="button button-number" @click="addKey('7')">7</div>
        <div class="button button-number" @click="addKey('8')">8</div>
        <div class="button button-number" @click="addKey('9')">9</div>
        <div class="button button-operator" @click="addKey('%')">
          <i class="bi bi-percent"></i>
        </div>
        <div class="button button-operator" @click="setNegative()">
          <i class="bi bi-plus-slash-minus"></i>
        </div>
        <div class="button button-number" @click="addKey('0')">0</div>
        <div class="button button-operator" @click="addKey('.')">.</div>
        <div class="button button-operator" @click="sum()">=</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Calculator',
  mounted() {
    this.$store.commit('getInitialHistory');
    this.$store.commit('getInitialResult');
  },
  computed: {
    history() {
      return this.$store.state.history;
    },
    result() {
      return this.$store.state.result;
    },
  },
  methods: {
    addKey(key: any) {
      this.$store.commit('addKey', key);
    },
    clear() {
      this.$store.commit('clear');
    },
    sum() {
      this.$store.dispatch('sum');
    },
    setNegative() {
      this.$store.commit('setNegative');
    },
  }
}
</script> 

<style lang="scss">
.main-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  .device-container {
    width: 100%;
    max-width: 400px;
    border: 1px solid #2563EB;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    gap: 1.5rem;

    .display-history {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 500;
      color: #737373;
      margin-bottom: 3rem;
    }

    .display-container-inner {
      width: 100%;
      border-bottom: 1px solid #c5c5c5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 2rem;
      font-weight: 500;
      color: #737373;
      gap: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;

      .display-symbol {
        font-size: 3rem;
      }

      .display-result {
        width: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 2rem;
        font-weight: 500;
        color: #737373;
        text-align: right;
      }

    }

    .button-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1rem;
      font-weight: 500;
      color: #737373;

      .button {
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        background-color: #FEF3C7;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: calc(2.3rem * 1 + (100vw - 400px) * 0.005);
        cursor: pointer;

      }

      .button-clear {
        grid-column: span 2;
        aspect-ratio: auto;
        width: 100%;
        height: 100%;
        background-color: #E0F2FE;
        border-radius: 60px;
        letter-spacing: 5px;
        font-weight: 400;
        font-size: calc(1.3rem * 1 + (100vw - 400px) * 0.005);
      }

      .button-operator {
        background-color: #FEF3C7;
      }

      .button-number {
        background-color: #E0F2FE;
      }
    }
  }
}
</style>
