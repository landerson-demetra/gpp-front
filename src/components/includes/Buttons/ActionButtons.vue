<template>
    <div>
        <div class="action-buttons">
            <button v-on:click="EditEvent" data-toggle="modal" :data-target="'#modalEditar' + this.xprops.evName" class="btn btn-warning"><i class="fa fa-edit"></i></button>
            <button v-on:click="DeleteEvent" data-toggle="modal" :data-target="'#modalDeletar' + this.xprops.evName"  class="btn btn-danger"><i class="fa fa-trash"></i></button>
        </div>
    </div>
</template>

<script>
import Bus from '../../../bus'

export default {
    name: 'ActionButtons',
    props: ['xprops','row'],
    methods: {
        EditEvent() {
            Bus.$emit('evAct' + this.xprops.evName + 'Edit', this.row.raw)
        },
        DeleteEvent() {
            Bus.$emit('evAct' + this.xprops.evName + 'Delete', this.row.raw)
        }
    }
}
</script>