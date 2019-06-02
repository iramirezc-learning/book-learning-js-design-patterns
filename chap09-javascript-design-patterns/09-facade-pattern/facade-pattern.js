const Complex = function ({ logger }) {
  return (function () {
    const _private = {
      i: 0,
      get: function () {
        logger(`current value: ${this.i}`)
        return this.i
      },
      set: function (newVal) {
        this.i = newVal
      },
      run () {
        logger(`running at: ${this.i} Kms/Hr`)
      }
    }

    return {
      facade (args) {
        _private.set(args.val)
        _private.get()

        if (args.run) {
          _private.run()
        }
      }
    }
  }())
}

module.exports = Complex
