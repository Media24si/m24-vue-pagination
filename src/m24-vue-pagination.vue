<template>
  <nav v-if="total > 0">
    <a
      v-for="(navPage, index) in pages"
      :key="index"
      href="#"
      :class="{ active: navPage === page, disabled: isDisabled(page, index) }"
      :aria-disabled="isDisabled(navPage, index)"
      @click.prevent="pageChange(navPage, index)">
      <span v-html="content(navPage, index)" />
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
      validator: (total) => total >= 0
    },
    page: {
      type: Number,
      default: 0,
      validator: (page) => page >= 0
    },
    perPage: {
      type: Number,
      default: 10,
      validator: (perPage) => perPage > 0
    },
    maxShown: {
      type: Number,
      default: 3,
      validator: (maxShown) => maxShown > 0
    },
    navBack: {
      type: String,
      default: '«'
    },
    navFront: {
      type: String,
      default: '»'
    }
  },
  computed: {
    startFrom () {
      return this.page * this.perPage
    },
    endAt () {
      const ending = this.startFrom + this.perPage

      return ending > this.total ? this.total : ending
    },
    totalPages () {
      if (!this.perPage) {
        return this.perPage
      }

      return Math.ceil(this.total / this.perPage)
    },
    midRange () {
      return this.maxShown / 2
    },
    midFilter () {
      const pageRange = Array.from(Array(this.totalPages).keys()).slice(2, -2)

      if (pageRange.length > this.maxShown) {
        if (this.belowMidRange(pageRange)) {
          return pageRange.slice(0, this.maxShown)
        } else if (this.aboveMidRange(pageRange)) {
          return pageRange.slice(-this.maxShown)
        } else {
          return pageRange.filter(page => {
            const diffPage = this.page - 1 - page
            return (diffPage < 0)
              ? Math.abs(diffPage) <= this.midRange
              : diffPage < this.midRange
          })
        }
      }

      return null
    },
    pages () {
      if (this.totalPages === 1) {
        return [
          0,
          0,
          1
        ]
      }

      const midPages = this.midFilter
      const pages = midPages
        ? [
          midPages[0] - 1 === 1 ? 1 : '...',
          ...midPages,
          midPages[midPages.length - 1] + 1 === this.totalPages - 2 ? this.totalPages - 2 : '...'
        ]
        : Array.from(Array(Math.abs(this.totalPages - 2)).keys()).map(page => page + 1)

      return [
        this.page - 1,
        0,
        ...pages,
        this.totalPages - 1,
        this.page + 1
      ]
    }
  },
  methods: {
    aboveMidRange (range) {
      return this.page - range[range.length - 1] >= -this.midRange
    },
    belowMidRange (range) {
      return this.page - range[0] < this.midRange
    },
    content (page, index) {
      if (index === 0) {
        return this.navBack
      }

      if (index === this.pages.length - 1) {
        return this.navFront
      }

      if (page === '...') {
        return page
      }

      return page + 1
    },
    isDisabled (page, index) {
      if (this.page === 0 && index === 0) {
        return true
      }

      if (this.pages.length - 1 === index && this.page === this.totalPages - 1) {
        return true
      }

      return false
    },
    pageChange (page, index) {
      if (page < 0 || (page === 0 && index === 0) || page === '...' || page >= this.totalPages) {
        return
      }

      this.$emit('page-change', (index === 0 || index === this.pages.length - 1)
        ? page
        : page + 1
      )
    }
  }
}
</script>
