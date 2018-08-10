<template>
    <div>
        <div class="row">
            <div class="content-gest mb-5 col-md-12" :class="{ 'col-lg-9': !gestExpanded, 'col-lg-12': gestExpanded }">
                <div class="card shadow border-0">
                    <div class="card-header border-0 bg-white">
                        <div class="row">
                            <h3 class="col-md-10 mt-0">Gestão de Patrimônios</h3>
                            <div class="col-md-2 text-right d-none d-lg-block">
                                <button class="btn-primary" v-on:click="gestExpanded = !gestExpanded"><i class="fas" :class="{ 'fa-forward': !gestExpanded, 'fa-backward': gestExpanded }"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="#noaction">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="PEP">PEP</label>
                                    <input id="PEP" type="text" class="form-control" placeholder="R.XXXX.99.99.99.9999">
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Contribuinte">Contribuinte</label>
                                    <input id="Contribuinte" type="text" class="form-control" placeholder="NºContribuinte" disabled>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Vendido">Vendido</label>
                                    <input id="Vendido" type="text" class="form-control" placeholder="Não" disabled>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="invisible">Ação</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModal">Administração</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="invisible">Ação</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-primary" type="button">Jurídico</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="Empreendimento">Empreendimento</label>
                                    <v-select name="Empreendimento" placeholder="Empreendimento" :options="[]">
                                        <span slot="no-options">Nenhum empreendimento encontrado.</span>
                                    </v-select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Bloco">Bloco</label>
                                    <select name="bloco" id="Bloco" class="form-control">
                                        <option v-for="n in 15">{{ n }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Unidade">Unidade</label>
                                    <select name="unidade" id="Unidade" class="form-control">
                                        <option v-for="n in 5">{{ n }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Invadido">Invadido</label>
                                    <select name="invadido" id="Invadido" class="form-control">
                                        <option>Sim</option>
                                        <option>Não</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Status">Status</label>
                                    <select name="status" id="Status" class="form-control">
                                        <option>Estoque</option>
                                        <option>Pré-distrato</option>
                                    </select>
                                </div>
                            </div>
                        </form>

                        <h4 class="pb-3 text-muted border-bottom">Históricos e status</h4>

                        <datatable :Pagination="false" :HeaderSettings="false" v-bind="$data.historicos"/>

                        <h4 class="mt-4 pb-3 text-muted">Condominios e IPTUs</h4>

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Condominios [{{ this.condominios.data.length }}]</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">IPTUs [{{ this.condominios.data.length }}]</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <datatable :Pagination="false" :HeaderSettings="false" v-bind="$data.condominios"/>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                        </div>
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary"><i class="fas fa-print"></i> Imprimir</button>
                            <div class="dropup">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><i class="fas fa-file-export"></i> Exportar</button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#"><i class="fas fa-file-pdf"></i> PDF</a>
                                    <a class="dropdown-item" href="#"><i class="fas fa-file-excel"></i> CSV</a>
                                    <a class="dropdown-item" href="#"><i class="fas fa-file-excel"></i> XLSX</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Resumo de patrimônios -->
            <GppResumo :gest="gestExpanded"></GppResumo>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GppResumo from '../includes/GppResumo'

export default {
  name: 'GestaoPatrimonios',
  data() {
    return {
        gestExpanded: false,

        // DTables
        historicos: {
            fixHeaderAndSetBodyMaxHeight: 160,
            tblStyle: 'table-layout: fixed', // must
            tblClass: 'table-borderless table-sm table-responsive-sm',
            columns: [
                { title: 'Contrato', field: 'contrato',  fixed: true },
                { title: 'Nome', field: 'nome' },
                { title: 'CPF/CNPJ', field: 'cpfcnpj'},
                { title: 'Tipo de contrato', field: 'vlcontrato', sortable: true},
                { title: 'Data do contrato', field: 'drcontrato', sortable: true},
                { title: 'Status', field: 'status', sortable: true},
            ].map(col => (col.colStyle = { width: '200px', height: '20px' }, col)),
            data: [
                {
                    contrato: '0001251',
                    nome: 'Nome teste',
                    cpfcnpj: '888.888.888-56',
                    vlcontrato: 'R$ 25,000.00',
                    drcontrato: '23/03/2018',
                    status: 'Ativo',
                },
            ],
            summary: {},
            total: 0,
            query: {}
        },
        condominios: {
            fixHeaderAndSetBodyMaxHeight: 160,
            tblClass: 'table-borderless table-sm table-responsive-sm border border-top-0',
            columns: [
                { title: 'Status', field: 'status', sortable: true},
                { title: 'Periodo', field: 'periodo', sortable: true},
                { title: 'Valor', field: 'valor', sortable: true},
                { title: 'Juros', field: 'juros', sortable: true},
                { title: 'Multa', field: 'multa', sortable: true},
                { title: 'Correção', field: 'correcao', sortable: true},
                { title: 'Total', field: 'total', sortable: true},
                { title: 'Data pgto.', field: 'datapgto', sortable: true},
                { title: 'Ações', field: 'acoes'},
            ].map(col => (col.colStyle = { width: '200px', height: '20px' }, col)),
            data: [
                {
                    status: 'Ativo',
                    periodo: 'Periodo',
                    vencimento: '23/07/2018',
                    valor: 'R$ 51.588,00',
                    juros: '0%',
                    multa: '0%',
                    correcao: '0%',
                    total: 'R$ 57.588,00',
                    datapgto: '25/07/2018',
                    acoes: 'Action',
                },{
                    status: 'Ativo',
                    periodo: 'Periodo',
                    vencimento: '23/07/2018',
                    valor: 'R$ 533.588,00',
                    juros: '0%',
                    multa: '0%',
                    correcao: '0%',
                    total: 'R$ 57.588,00',
                    datapgto: '25/07/2018',
                    acoes: 'Action',
                },{
                    status: 'Ativo',
                    periodo: 'Periodo',
                    vencimento: '23/07/2018',
                    valor: 'R$ 57.588,00',
                    juros: '0%',
                    multa: '0%',
                    correcao: '0%',
                    total: 'R$ 57.588,00',
                    datapgto: '25/07/2018',
                    acoes: '',
                },
            ],
            summary: {},
            total: 0,
            query: {}
        }
    }
  },
  components: { GppResumo },
  computed: mapState({profile: state => state.user.profile})
}
</script>