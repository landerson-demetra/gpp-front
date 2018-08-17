<template>
    <ul class="pagination justify-content-end disabled" v-if="paginator.total > paginator.per_page">
        <li v-if="paginator.current_page != 1" class="page-item" title="Anterior">
            <a href="#" class="page-link" aria-label="Anterior" v-on:click.prevent="selectPage(paginator.current_page - 1)"><span aria-hidden="true">&laquo;</span></a>
        </li>

        <li v-for="n in getPages()" class="page-item" :class="{ 'active': n == paginator.current_page }"><a v-on:click.prevent="selectPage(n)" class="page-link" href="#" >{{ n }}</a></li>

        <li v-if="paginator.current_page != paginator.last_page" class="page-item" title="Última">
            <a class="page-link" href="#" aria-label="Última" v-on:click.prevent="selectPage(paginator.last_page)">Última</a>
        </li>

        <li v-if="paginator.current_page != paginator.last_page" class="page-item" title="Próxima">
            <a class="page-link" href="#" aria-label="Próxima" v-on:click.prevent="selectPage(paginator.current_page + 1)"><span aria-hidden="true">&raquo;</span></a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        paginator: {
            type: [Object]
        },
        limit: {
            type: Number,
            default: 0
        }
    },

    methods: {
        selectPage: function(page){
            if(page == this.paginator.current_page) return

            this.$emit('changePage', page)
            this.paginator.current_page = page
        },
        getPages: function(){
            if(this.limit === -1){
                return 0
            }

            if(this.limit === 0){
                return this.paginator.last_page
            }

            var start = this.paginator.current_page - this.limit,
                end = this.paginator.current_page + this.limit + 1,
                pages = [],
                index

            start = start < 1 ? 1 : start
            end = end >= this.paginator.last_page ? this.paginator.last_page + 1 : end

            for(index = start; index < end; index++){
                pages.push(index)
            }

            return pages
        }
    }
}
</script>