<template>
    <div>
        <form v-on:submit.prevent="onSubmit">
            <input v-validate="'required|email'" name="email" type="text">
            <span>{{ errors.first('email') }}</span>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Testes',
    methods: {
        onSubmit() {
            this.$validator.validate().then(result => {
                console.log(result)
            });
        }
    },
    mounted() {

    }
}
</script>