# vue-pagination
Simple unstyled Vue pagination component.

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License" />
  </a>
  <a href="https://npmjs.org/package/m24-vue-pagination">
    <img src="https://img.shields.io/npm/v/m24-vue-pagination.svg?style=flat-square" alt="Packagist" />
  </a>
</p>

* [Vue.js](http://vuejs.org/) (tested with 2.6.11).

### Installation
```
npm install --save m24-vue-pagination
```

### Example
```js
import pagination from 'm24-vue-pagination'

new Vue({
  el: '#app',
  data: {
    total: 0,
    currentPage: 1,
    items: [],
  },
  mounted () {
    this.loadData(this.currentPage)
  },
  methods: {
    loadData(page) {
      this.currentPage = page
      const options = {
        params: {
          page: this.currentPage
        }
      }

      window.axios.get('/getData', options)
        .then(response => {
          this.items = response.data.data
          this.total = response.data.paginate.total
         })
    }
  },
  components: {
    pagination
  }
})
```

```html
<body id="app">
  <ul class="list-group">
    <li class="list-group-item" v-for="item in items">{{ item.name }}</li>
  </ul>

  <pagination
    :total="total"
    :page="currentPage"
    @page-change="loadData" />
</body>
```

#### Props
| Name          | Type     | Default | Required | Description
| :------------ | :--------| :-------| :--------| :-----------
| total         | Number   |         | true     | Total number of items
| page          | Number   | 0       |          | The current page number
| perPage       | Number   | 10      |          | Number of items per page
| maxShown      | Number   | 5       |          | Number of items shown on each site
| navBack       | String   | «       |          | Back indicator (can be HTML, such as svg, icon...)
| navFront      | String   | »       |          | Forward indicator (can be HTML, such as svg, icon...)

### Events
| Name          | Returns  | Description
| :------------ | :--------| :-----------
| page-change    | selected page | Event that sends back the selected page

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[link-author]: https://github.com/pogachar
