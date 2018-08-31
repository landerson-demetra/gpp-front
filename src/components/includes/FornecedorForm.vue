<template>
    <div>
        <form action="" v-on:submit.prevent="updateFornecedor()">
            <div class="row">
                <div class="form-group col-lg-9">
                    <label for="name">Nome <span class="text-danger">*</span></label>
                    <input id="name" type="text" class="form-control" placeholder="Nome do fornecedor..." required="">
                </div>
                <div class="form-group col-lg-3">
                    <label for="numero_sap">Número SAP <span class="text-danger">*</span></label>
                    <input type="text" id="numero_sap" placeholder="Número SAP..." class="form-control" required="">
                </div>
                <div class="form-group col-lg-3">
                    <label for="cpf_cnpj">CNPJ/CPF <span class="text-danger">*</span></label>
                    <input id="cpf_cnpj" type="text" placeholder="CNPJ/CPF do fornecedor..." class="form-control" required="">
                </div>
                <div class="form-group col-lg-3">
                    <label for="site">Site</label>
                    <input type="text" id="site" placeholder="Site..." class="form-control">
                </div>
                 <div class="form-group col-lg-6">
                    <label for="Segmento">Segmento(s) <span class="text-danger">*</span></label>
                    <v-select :placeholder="'Selecione um ou mais segmento(s)...'" multiple :options="['Prefeitura', 'Administradora', 'Fornecedor']"></v-select>
                </div>

                <div class="col-12"><h5>Endereço</h5><hr></div>

                <div class="form-group col-lg-4">
                   <label for="CEP">CEP</label>
                   <input :class="{'is-invalid': CEPHasError}" type="text" placeholder="CEP..." class="form-control">
                </div>
                <div class="form-group col-lg-4">
                   <label for="Logradouro">Logradouro</label>
                   <input type="text" placeholder="Logradouro..." class="form-control">
                </div>
                <div class="form-group col-lg-4">
                   <label for="Numero">Número</label>
                   <input type="text" placeholder="Número..." class="form-control">
                </div>
                <div class="form-group col-lg-4">
                    <label for="Estado">Bairro</label>
                    <input type="text" placeholder="Bairro..." class="form-control">
                </div>
                <div class="form-group col-lg-4">
                    <label for="Estado">Estado</label>
                    <input type="text" placeholder="Estado..." class="form-control">
                </div>
                <div class="form-group col-lg-4">
                    <label for="Cidade">Cidade</label>
                    <input type="text" placeholder="Cidade..." class="form-control">
                </div>
                <!-- <div class="form-group col-lg-12">
                    <label for="Responsavel">Responsável</label>
                    <v-select name="Nome" id="Nome" v-model="Responsavel" placeholder="Selecione um responsável..." :options="[]">
                        <span slot="no-options">Nenhum responsável encontrado.</span>
                    </v-select>
                </div> -->
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'FornecedorForm',
    props: [],
    data() {
        return  {
            CEPHasError: false
        }
    }
}
</script>