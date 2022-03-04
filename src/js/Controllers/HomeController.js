app.controller("HomeController", function ($scope, $location, $timeout, DataService, ModalService) {
  $scope.alerts = [];
  $scope.selection = null;
  $scope.alertMenuItems = ['Immunization Alerts', 'Lab Alerts', 'DI Alerts', 'Procedure Alerts', 'RX Specific Alerts', 'DX Specific Alerts', 'Patient Specific Alerts']
  $scope.added = false;
  $scope.nameError = false;
  $scope.descError = false;
  $scope.webRefError = false;
  $scope.error = false;
  $scope.selectedCols = [];
  $scope.toggleAll = false;
  $scope.search = "";
  $scope.MasterAlertData = [];
  $scope.formData = new Object();
  $scope.formData.name = '';
  $scope.formData.desc = '';
  $scope.formData.webRef = '';

  $scope.reset = function () {
    $scope.formData.name = '';
    $scope.formData.desc = '';
    $scope.formData.webRef = '';
  }


  $scope.init = function () {
    DataService.load("assets/data.json").then(function (response) {
      DataService.set(response.data.data);
      $scope.alerts = response.data.data;

      //adding dummy data here to match length upto 250 records
      while ($scope.alerts.length != 250) {
        var alert = new Object();
        alert.id = $scope.alerts.length > 0 ? $scope.alerts[$scope.alerts.length - 1].id + 1 : 1;
        alert.name = "Test";
        alert.description = "Test";
        alert.webReference = "Test";
        $scope.alerts.push(alert);
      }
      $scope.MasterAlertData = [...$scope.alerts];
    });

  }
  $scope.init();


  $scope.showAlertsPopup = function (id) {
    if ($scope.alerts.length > 0) {
      ModalService.Open(id);
      $scope.initPaging();
    }
  };

  $scope.hideAlertsPopup = function (id) {
    ModalService.Close(id);
  }

  $scope.setSelection = function (sel) {
    $scope.selection = sel;
  }
  $scope.hideBanner = function () {
    $timeout(function () {
      $scope.added = false;
    }, 2000);
  }

  $scope.addAlert = function (form) {
    var alert = new Object();
    alert.id = $scope.alerts.length > 0 ? $scope.alerts[$scope.alerts.length - 1].id + 1 : 1;

    $scope.nameError = $scope.formData.name ? false : true;
    $scope.descError = $scope.formData.desc ? false : true;;
    $scope.webRefError = $scope.formData.webRef ? false : true;;

    if (!($scope.nameError || $scope.descError || $scope.webRefError)) {
      alert.name = $scope.formData.name;
      alert.description = $scope.formData.desc;
      alert.webReference = $scope.formData.webRef;
      $scope.error = false;
      $scope.nameError = false;
      $scope.descError = false;
      $scope.webRefError = false;
      $scope.alerts.push(alert);
      $scope.added = true;
      $scope.hideBanner();
      alert = null;
      document.getElementById("myForm").reset();
      $scope.reset();
    } else {
      $scope.error = true;
      $scope.nameError = true;
      $scope.descError = true;
      $scope.webRefError = true;
    }

  }
  $scope.checkSelected = function (id) {
    var selected = false;
    $scope.selectedCols.forEach((ele) => {
      selected = ele == id;
    })
    return selected;
  }

  $scope.addRemove = function (id) {
    $scope.checkSelected(id) ? $scope.selectedCols.pop(id) : $scope.selectedCols.push(id);
  }

  $scope.deleteSelected = function () {

    $scope.selectedCols.forEach((ele) => {
      $scope.alerts.forEach((element, index) => {
        if (ele == element.id) {
          $scope.alerts.splice(index, 1);
        }
      });
    });

    if ($scope.toggleAll) {
      $('#toggler').prop('checked', false);
    }

  }
  $scope.toggleCheckboxes = function (flg) {
    $('.checks').each(function () {
      $(this).prop('checked', flg);
    });
  }

  $scope.toggleAllAlerts = function () {
    $scope.toggleAll = !$scope.toggleAll;
    if ($scope.toggleAll) {
      $scope.alerts.forEach((el) => {
        $scope.selectedCols.push(el.id);
      });
    } else {
      $scope.selectedCols = [];
    }
    $scope.toggleCheckboxes($scope.toggleAll);

    //Add logic to check / uncheck all checkboxes
  }

  $scope.initPaging = function () {
    $scope.totalPages = $scope.alerts.length / 5;
    $scope.currentPage = 1;


  }
});