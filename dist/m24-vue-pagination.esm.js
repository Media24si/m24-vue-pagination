//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  props: {
    total: {
      type: Number,
      required: true,
      validator: function (total) { return total >= 0; }
    },
    page: {
      type: Number,
      default: 0,
      validator: function (page) { return page >= 0; }
    },
    perPage: {
      type: Number,
      default: 10,
      validator: function (perPage) { return perPage > 0; }
    },
    maxShown: {
      type: Number,
      default: 3,
      validator: function (maxShown) { return maxShown > 0; }
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
    startFrom: function startFrom () {
      return this.page * this.perPage
    },
    endAt: function endAt () {
      var ending = this.startFrom + this.perPage;

      return ending > this.total ? this.total : ending
    },
    totalPages: function totalPages () {
      if (!this.perPage) {
        return this.perPage
      }

      return Math.ceil(this.total / this.perPage)
    },
    midRange: function midRange () {
      return this.maxShown / 2
    },
    midFilter: function midFilter () {
      var this$1 = this;

      var pageRange = Array.from(Array(this.totalPages).keys()).slice(2, -2);

      if (pageRange.length > this.maxShown) {
        if (this.belowMidRange(pageRange)) {
          return pageRange.slice(0, this.maxShown)
        } else if (this.aboveMidRange(pageRange)) {
          return pageRange.slice(-this.maxShown)
        } else {
          return pageRange.filter(function (page) {
            var diffPage = this$1.page - 1 - page;
            return (diffPage < 0)
              ? Math.abs(diffPage) <= this$1.midRange
              : diffPage < this$1.midRange
          })
        }
      }

      return null
    },
    pages: function pages () {
      if (this.totalPages === 1) {
        return [
          0,
          0,
          0
        ]
      }

      var midPages = this.midFilter;
      var pages = midPages
        ? [
          midPages[0] - 1 === 1 ? 1 : '...' ].concat( midPages,
          [midPages[midPages.length - 1] + 1 === this.totalPages - 2 ? this.totalPages - 2 : '...']
        )
        : Array.from(Array(Math.abs(this.totalPages - 2)).keys()).map(function (page) { return page + 1; });

      return [
        this.page - 1,
        0 ].concat( pages,
        [this.totalPages - 1],
        [this.page + 1]
      )
    }
  },
  methods: {
    aboveMidRange: function aboveMidRange (range) {
      return this.page - range[range.length - 1] >= -this.midRange
    },
    belowMidRange: function belowMidRange (range) {
      return this.page - range[0] < this.midRange
    },
    content: function content (page, index) {
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
    isDisabled: function isDisabled (page, index) {
      if (this.page === 0 && index === 0) {
        return true
      }

      if (this.pages.length - 1 === index && this.page === this.totalPages - 1) {
        return true
      }

      return false
    },
    pageChange: function pageChange (page, index) {
      if (page < 0 || (page === 0 && index === 0) || page === '...' || page >= this.totalPages) {
        return
      }

      this.$emit('page-change', (index === 0 || index === this.pages.length - 1)
        ? page
        : page + 1
      );
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.total > 0
    ? _c(
        "nav",
        _vm._l(_vm.pages, function(navPage, index) {
          return _c(
            "a",
            {
              key: index,
              class: {
                active: navPage === _vm.page,
                disabled: _vm.isDisabled(_vm.page, index)
              },
              attrs: {
                href: "#",
                "aria-disabled": _vm.isDisabled(navPage, index)
              },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.pageChange(navPage, index)
                }
              }
            },
            [
              _c("span", {
                domProps: { innerHTML: _vm._s(_vm.content(navPage, index)) }
              })
            ]
          )
        }),
        0
      )
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;
