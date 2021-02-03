<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card bg-light">
                    <h5 class="my-3 text-center">Bienvenu sur le réseau social interne</h5>
                    <div class="card-body d-flex justify-content-between">
                        <bouton class="btn btn-dark"><router-link to="/connexion">Connectez vous</router-link></bouton>
                        <bouton class="btn btn-dark"><router-link to="/inscription">Inscrivez vous</router-link></bouton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    Name: "Accueil"
}
</script>

<style>
    body {
        background-color: #1d3c6e
    }
</style>