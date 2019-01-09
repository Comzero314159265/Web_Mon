<template>
  <div class="container-fluid">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <div class="row ">
            <div class="col-md-8">
                Source : <a href="" id="websrc">https://www.blognone.com</a>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.blognone.com" type="text/html" id="mainembed" height="850"
                        sandbox="allow-same-origin allow-scripts allow-forms"></iframe>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="container">
                            <div class="form-group row">
                                <label for="" class="col-form-label col-md-3 text-right">Add Source : </label>
                                <input type="text" class="form-control col-md-7" placeholder="www.url.com" id="txtUrl" />
                                <button type="button" class="btn btn-success col-md-2" id="btnAdd">Add</button>
                            </div>

                            <div class="form-group row">
                                <label for="" class="col-form-label col-md-3 text-right">Set Time: </label>
                                <input type="text" class="form-control col-md-7" placeholder="Minute" id="txtTime" />
                                <button type="button" class="btn btn-info col-md-2" id="btnSetTime">Set</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="container">
            <div class="row mt-5">
                <h3>Source Data</h3>
                <table class="table">
                    <thead>
                        <th>#</th>
                        <th>Url</th>
                        <th></th>
                    </thead>
                    <tbody id="dataContent">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>

<script>
export default {
  name: 'Home'
}
</script>