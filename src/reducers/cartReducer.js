export const cartInitialState =
  JSON.parse(window.localStorage.getItem('cart')) || [];

export const CART_ACTIONS_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
};

// update localStorage with state for cart
export const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state));
};

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case CART_ACTIONS_TYPES.ADD_TO_CART: {
      const { id } = actionPayload;
      // Check if the product is already in the cart
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        // Forma 1: structuredClone
        //   const newState = structuredClone(state);
        //   newState[productInCartIndex].quantity += 1;

        // Forma 2: usando map
        //   const newState = state.map((item) => {
        //     if (item.id === id) {
        //       return {
        //         ...item,
        //         quantity: item.quantity + 1,
        //       };
        //     }

        //     return item;
        //   });

        // Forma 3: ⚡ usando spread operator y slice
        const newState = [
          ...state.slice(0, productInCartIndex),
          {
            ...state[productInCartIndex],
            quantity: state[productInCartIndex].quantity + 1,
          },
          ...state.slice(productInCartIndex + 1),
        ];

        updateLocalStorage(newState);
        return newState;
      }

      // producto no esta en el carrito
      const newState = [
        ...state,
        {
          ...actionPayload, // product
          quantity: 1,
        },
      ];

      updateLocalStorage(newState);
      return newState;
    }
    case CART_ACTIONS_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState;
    }
    case CART_ACTIONS_TYPES.CLEAR_CART: {
      updateLocalStorage([]);
      return [];
    }
  }

  return state;
};
