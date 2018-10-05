<template>
    <div>
        <div class="action-buttons text-center">
            <button v-on:click="onOk" data-toggle="modal" :data-target="'#modalEditar' + this.xprops.evName" class="btn btn-warning"><i class="fa fa-edit"></i></button>
            <button v-on:click="onOk" data-toggle="modal" :data-target="'#modalDeletar' + this.xprops.evName"  class="btn btn-danger"><i class="fa fa-trash"></i></button>
        </div>
    </div>
</template>

<script>
import Bus from '../../../bus'

export default {
    name: 'ActionButtons',
    props: ['xprops','row'],
    methods: {
        onOk() {
            Bus.$emit('evActiveDado', this.row.raw)
        }
    }
}
</script>