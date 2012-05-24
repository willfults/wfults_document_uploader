

function FolderListCtrl($scope, $http) {

	$scope.setDetails = function(location) {
		location = $scope.rootFolder + location;
		if(location != "//"){
			$scope.rootFolder = location  + "/";
		}
		$http.get('/Document_Uploader/rest/folders/details?location=' + location).success(function(data) {
			$scope.details = data;
		});
	};
	
	$scope.createFolder = function(folderName) {
		folderName = $scope.rootFolder + folderName;
		$http.get('/Document_Uploader/rest/folders/create?folderName=' + folderName).success(function(data) {
			$.gritter.add({
				title: 'Folder Created',
				text: folderName
			});
			var rootFolder = $scope.rootFolder;
			$scope.rootFolder = rootFolder.substring(0,rootFolder.length-1);
			$scope.setDetails("");
		});
	};
	
	$scope.deleteFolder = function(folderName) {
		var answer = confirm("Delete the file or folder: " + folderName + "?")
		folderName = $scope.rootFolder + folderName;
		if (answer){
			$http.get('/Document_Uploader/rest/folders/delete?folderName=' + folderName).success(function(data) {
				$.gritter.add({
					title: 'Deleted',
					text: folderName
				});
				var rootFolder = $scope.rootFolder;
				$scope.rootFolder = rootFolder.substring(0,rootFolder.length-1);
				$scope.setDetails("");
			});
		}
	};
	
	$scope.renameFile = function(folderName,destinationId) {
		folderName = $scope.rootFolder + folderName;
		var destination = $scope.rootFolder + $('#edit' + destinationId).val();
		$http.get('/Document_Uploader/rest/folders/rename?source=' + folderName + '&destination=' + destination).success(function(data) {
			$.gritter.add({
				title: 'File Updated',
				text: folderName
			});
			var rootFolder = $scope.rootFolder;
			$scope.rootFolder = rootFolder.substring(0,rootFolder.length-1);
			$scope.setDetails("");
		});
	};
	
	$scope.upOneFolder = function() {
		var newLocation = $scope.rootFolder;
		newLocation = newLocation.substring(0,newLocation.lastIndexOf("/"));
		$scope.rootFolder = newLocation.substring(0,newLocation.lastIndexOf("/"));
		$scope.setDetails("");
	};
	 
}

