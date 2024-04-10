module.exports = {
  devServer: {
    client: {
      overlay: {
        runtimeErrors: (error) => {
          if (
            error.message ===
            'ResizeObserver loop completed with undelivered notifications.'
          ) {
            return false
          }
          return true
        },
      },
    },
  },
}
module.exports = {
  devServer: {
    client: {
      overlay: {
        runtimeErrors: (error) => {
          if (
            error.message ===
            'ResizeObserver loop completed with undelivered notifications.'
          ) {
            return false
          }
          return true
        },
      },
    },
  },
}
