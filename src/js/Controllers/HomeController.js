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
    });

  }
  $scope.init();


  $scope.showAlertsPopup = function (id) {
    if ($scope.alerts.length > 0) {
      ModalService.Open(id);
      console.log(...$scope.alerts);
      // $scope.setSelection($scope.alertMenuItems[0]);
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
    if (form) {
      $scope.nameError = form.name ? false : true;
      $scope.descError = form.desc ? false : true;;
      $scope.webRefError = form.webRef ? false : true;;
      alert.name = form.name;
      alert.description = form.desc;
      alert.webReference = form.webRef;
      if (!($scope.nameError || $scope.descError || $scope.webRefError)) {
        $scope.error = false;
        $scope.nameError = false;
        $scope.descError = false;
        $scope.webRefError = false;
        $scope.alerts.push(alert);
        console.log($scope.alerts);
        $scope.added = true;
        $scope.hideBanner();
        alert = null;
        document.getElementById("myForm").reset();
        form = undefined;
      } else {
        $scope.error = true;
      }


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
          console.log("Deleted - " + ele, element);
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
});