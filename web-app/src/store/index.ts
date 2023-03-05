import { Store, createStore } from "vuex";
import { Item } from "../../Model/Item";

export interface State {
  count: number;
  cart: Item[];
  commands: string[];
}

export const store = createStore<State>({
  state: {
    count: 0,
    cart: [],
    commands: [],
  },
  mutations: {
    addArticleToCart(state, article) {
      for (const item of state.cart) {
        if (item.id == article.id) {
          item.quantity++;
        }
      }
      if (state.cart.length == 0 || state.cart.every((p) => p.id != article.id))
        state.cart.push(article);
    },

    addQuantity(state, data) {
      for (const item of state.cart) {
        if (item.id == data) {
          item.quantity++;
        }
      }
    },

    removeQuantity(state, data) {
      for (const item of state.cart) {
        if (item.id == data) {
          item.quantity--;
        }
        if (item.quantity <= 0) {
          state.cart = state.cart.filter((p) => data != p.id);
        }
      }
    },

    setNewCommand(state, datas) {
      state.commands.push(datas);
    },

    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(localStorage.getItem("store") as string)
          )
        );
      }
    },
  },
  getters: {
    getCount(state) {
      return state.cart.length;
    },

    getCart(state) {
      return state.cart;
    },

    getCommands(state) {
      return state.commands;
    },

    getSubCartTotal(state) {
      let total = 0;

      for (const price of state.cart) total += +price.price * price.quantity;
      return total;
    },
    getTax(state) {
      let total = 0;

      for (const price of state.cart) total += price.price * price.quantity;

      return total * 0.01;
    },

    getAllRestaurantId(state) {
      const restaurantId = [] as number[];
      for (const item of state.cart) {
        restaurantId.push(item.id_restaurant);
      }
      return restaurantId;
    },

    getAllArticle(state) {
      return state.cart;
    },

    cartTotal(state) {
      let total = 0;
      let tax = 0;
      for (const price of state.cart) total += +price.price * price.quantity;

      tax = total * 0.01;

      return total + tax;
    },
  },
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});
export default store;
