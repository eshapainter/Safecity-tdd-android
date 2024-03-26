$(function() {

    //////////////////////
    // Category Filters //
    //////////////////////
    var cat_filter_option = '<option value="" selected>All</option>';
    categories.forEach(function (category) {
        cat_filter_option += '<option value="'+category.id+'">'+category.title+'</option>';
    });
    $("#category_filter").html(cat_filter_option);
    $("#category_filter").select2();

    //////////////////
    // Date Filters //
    //////////////////
    
    $('.input-daterange').datepicker({
        format: 'yyyy/mm/dd',
        clearBtn: true
    });
    /* Code for tempusdominus bootstrap 4 datepicker */
    /*$("#datepickerstart_filter, #datepickerend_filter").datetimepicker({
        format: 'YYYY-MM-DD',
        useCurrent: false,
        buttons: {
            showClear: true
        },
        icons: { 
            clear: 'fa fa-trash'
        },
    });

    $("#datepickerstart_filter").on("change.datetimepicker", function (e) {
        $('#datepickerend_filter').datetimepicker('minDate', e.date);
    });
    $("#datepickerend_filter").on("change.datetimepicker", function (e) {
        $('#datepickerstart_filter').datetimepicker('maxDate', e.date);
    });*/

    ////////////////
    // DataTables //
    ////////////////
    var status_filter = 'pending_approval';
    var type_filter = location_filter = category_filter = start_date_filter = end_date_filter = '';
    var search_term = "";
    var selected_recordId_arr = [];

    // Reset Filter
    function resetFilter() {
        type_filter = location_filter = category_filter = start_date_filter = end_date_filter = search_term = '';
        $("#type_filter").val("").trigger('change.select2');
        $("#category_filter").val("").trigger('change.select2');
        $("#search_filter").val("");
        $("#datepickerstart_filter, #datepickerend_filter").datepicker('update', '');
        // Reset bulk selections
        resetBulkSelection();
        // Refresh DataTable
        reloadDataTable(false);     
    }

    // Initialize datatable
    var dataTableInstance = $('#myTable').DataTable({
                                lengthChange: false,
                                scrollResize: true,
                                searching: false,
                                //autoWidth: true, 
                                //paging: false, 
                                //info: false,
                                //scrollY: "100%",
                                scrollY: 500,
                                scrollCollapse: true,
                                processing: true,
                                serverSide: true,
                                rowId: 'id',
                                ajax: {
                                    url: baseURL+"admin/incidents/datatable",
                                    type: "POST",
                                    data: function (d) {
                                        d.status      = status_filter;
                                        d.type        = type_filter;
                                        d.location    = location_filter;
                                        d.category    = category_filter;
                                        d.start_date  = start_date_filter;
                                        d.end_date    = end_date_filter;
                                        d.search_term = search_term;
                                    }
                                },
                                columns: [
                                    {
                                        className: 'checklist text-center',
                                        render: function(data, type, row, meta) {
                                            console.log(selected_recordId_arr);
                                            console.log(row.id);
                                            var isSelected = selected_recordId_arr.indexOf(parseInt(row.id))>-1;
                                            return `<span class="custom-checkbox">
                                                        <input type="checkbox" class="record-checkbox" data-incidentid="${row.id}" id="row${row.id}" ${isSelected?'checked':''}>
                                                        <label for="row${row.id}"></label>
                                                    </span>`;
                                        }, 
                                    },
                                    {
                                        className: 'report-id showSplitView',
                                        data: 'id', 
                                        name:'id', 
                                        render: function(data, type, row, meta) {
                                            var incidentId = '<div>#'+row.id+'</div>';
                                            var category   = '<div>'+row.categories+'<div>';
                                            var address    = '<div>'+row.building+', '+row.landmark+', '+row.area+', '+row.city+', '+row.state+', '+row.country+'</div>';
                                            return incidentId+''+category+''+address;
                                        },
                                        visible: false
                                    },
                                    {
                                        className: 'action',
                                        data: 'id',
                                        name:'id',
                                        render: function(data, type, row, meta) {
                                            var postedBy = '<div>'+row.posted_by+'</div>';
                                            var incident_date = getIncidentDateTimeHtml(data, type, row, meta);
                                            var actionHtml = getActionHtml(data, type, row, meta);
                                            return postedBy+''+incident_date+''+actionHtml;
                                        },
                                        visible: false
                                    },
                                    { 
                                        className: 'report-id',
                                        data: 'id', 
                                        name:'id', 
                                        render: function(data, type, row, meta) {
                                            return '#'+row.id;
                                        }
                                    },
                                    { 
                                        className: 'category showSplitView',
                                        data: 'categories',
                                        name:'categories'
                                    },
                                    { 
                                        className: 'location table-fs-light',
                                        data: 'id',
                                        name:'id',
                                        render: function(data, type, row, meta) {
                                            return row.building+', '+row.landmark+', '+row.area+', '+row.city+', '+row.state+', '+row.country;
                                        }
                                    },
                                    { 
                                        className: 'posted-by table-fs-light',
                                        data: 'posted_by',
                                        name:'posted_by'
                                    },
                                    { 
                                        className: 'date table-fs-light',
                                        name:'id',
                                        render: getIncidentDateTimeHtml
                                    },
                                    { 
                                        className: 'action',
                                        render: getActionHtml
                                    },
                                ],
                                deferRender: true
                              });

    function reloadDataTable(preservePage) {
        if(!preservePage)
            dataTableInstance.ajax.reload();
        else {
            console.log('resetting without page change');
            // don't reset the current page
            dataTableInstance.ajax.reload(null, false)
        }
    }

    // Datatable Row Rendering Helper
    function getActionHtml(data, type, row, meta) {
        var html = `<div class="action--btn">`;
        if(row.status=='trashed')
            html += `<button class="btn text-red pl-0 action-update-status" data-status="delete" data-incidentid="${row.id}">Delete forever</button>`;
        if(row.status!='trashed' && row.status!='pending_approval')
            html += `<button class="btn text-red pl-0 action-update-status" data-status="trashed" data-incidentid="${row.id}">Trash</button>`;
        if(row.status!='rejected' && row.status!='trashed')
            html += `<button class="btn text-red action-update-status" data-status="rejected" data-incidentid="${row.id}">Reject</button>`;
        if(row.status!='saved')
            html += `<button class="btn text-grey action-update-status" data-status="saved" data-incidentid="${row.id}">Save</button>`;
        if(row.status!='approved' && row.status!='published')
            html += `<button class="btn text-primary action-update-status" data-status="approved" data-incidentid="${row.id}">Approve</button>`;
        if(row.status!='published')
            html += `<button class="btn text-primary action-update-status" data-status="published" data-incidentid="${row.id}">Publish</button>`;
        html += `</div>`;
        return html;      
    }

    function getIncidentDateTimeHtml(data, type, row, meta) {
        var date = moment(row.date).format('DD MMM YYYY');
        var start_time = moment(row.date+' '+row.time_from).format('hh:mm A');
        var end_time = row.time_to?moment(row.date+' '+row.time_to).format('- hh:mm A'):'';
        return `
        <div>${date}</div>
        <div>${start_time} ${end_time}</div>`;
    }

    // Filter by status
    $(".status-filter").click(function(event) {
        $(".status-filter.active").removeClass('active');
        $(this).addClass('active');
        status_filter = $(this).data('status');
        // Reset bulk selections
        resetBulkSelection();
        // Refresh DataTable
        reloadDataTable(false);
    });

    // Clear filters
    $("#clear-filters").click(function(event) {
        resetFilter();
    });

    // Filter by Type (Primary/Primary+Secondary)
    $("#type_filter").change(function(event) {
        type_filter = $(this).val();
        // Refresh DataTable
        reloadDataTable(false);
    });

    // Filter by Category
    $("#category_filter").change(function(event) {
        category_filter = $(this).val();
        // Refresh DataTable
        reloadDataTable(false);
    });

    // Filter by DateRange
    $("#datepickerstart_filter, #datepickerend_filter").change(function(event) {
        if($(this).val()=='') {
            $("#datepickerstart_filter, #datepickerend_filter").val('');
            start_date_filter = '';
            end_date_filter = '';
        } else {
            start_date_filter = $("#datepickerstart_filter").val();
            end_date_filter = $("#datepickerend_filter").val();
        }
        // Refresh DataTable
        reloadDataTable(false);
    });

    // Search
    $("#search_filter").keydown(function(event) {
        search_term = $(this).val();
        // Refresh DataTable
        reloadDataTable(false);
    });

    // Handle Datatable Actions
    $(document).on('click', '.hideSplitView', function(event) {
        event.preventDefault();
        console.log('hide split view!');
        $("#detail_container").addClass('d-none');
        $("#table_container").removeClass('col-47 pr-0').addClass('col-12');
        dataTableInstance.columns([3,4,5,6,7,8]).visible(true);
        dataTableInstance.columns([1,2]).visible(false);
        dataTableInstance.columns.adjust();
    });

    $(document).on('click', '.action-update-status', function(event) {
        event.preventDefault();
        var status = $(this).data('status');
        var id = $(this).data('incidentid');
        updateStatus(id, status);
    });

    $(document).on('click', '.showSplitView', function(event) {
        event.preventDefault();
        var id = dataTableInstance.row(this).id();
        fetchIncidentDetail(id);
    });
    
    function enableSplitView() {
        $("#table_container").removeClass('col-12').addClass('col-47 pr-0');
        $("#detail_container").removeClass('d-none');
        setDetailViewHeight();
        dataTableInstance.columns([3,4,5,6,7,8]).visible(false);
        dataTableInstance.columns([1,2]).visible(true);
        dataTableInstance.columns.adjust();
    }

    //////////////////
    // Bulk Actions //
    //////////////////
    $(document).on('change', '.record-checkbox', function(event) {
        event.preventDefault(); 
        var id = $(this).data('incidentid');
        if($(this).is(':checked')) {
            updateToBulk(id, 'add');
        } else {
            updateToBulk(id, 'remove');
        }
    });

    /**
     * Add/Remove record id to/from bulk actions
     * @param  {Integer} id  
     * @param  {String}  action add/remove
     * @return undefined
     */
    function updateToBulk(id, action) {
        var index = selected_recordId_arr.indexOf(id);
        if(action=='add') {
            // Add only if not already added
            if(index<0)
                selected_recordId_arr.push(id);
        } else {
            // Remove if already exists
            if (index > -1)
              selected_recordId_arr.splice(index, 1);
        }
        // Toggle Bulk action header
        toggleBulkActionHeader();
    }

    function toggleBulkActionHeader() {
        if(selected_recordId_arr.length>0) {
            $("#bulkaction-container").show();
            $("#bulkselected").text(selected_recordId_arr.length);
            var actionHtml = '<button class="btn fs-17 text-grey pl-0 bulk-download" >Download</button>';
            actionHtml += $(".action--btn:first").html();
            $(".bulkactionbtn-container").html(actionHtml);
            $(".bulkactionbtn-container .action-update-status").removeClass('action-update-status').addClass('bulkaction-update-status');
        } else {
            $("#bulkaction-container").hide();
            $("#bulkselected").text(0);
        }
    }

    function resetBulkSelection() {
        selected_recordId_arr = [];
        // Toggle Bulk action header
        toggleBulkActionHeader();
    }

    $(document).on('click', '.bulkaction-update-status', function(event) {
        event.preventDefault();
        var status = $(this).data('status');
        updateStatus(selected_recordId_arr, status);
    });

    /**
     * Update statuses of incidents
     * @param  {Array|Integer} incident_id
     * @param  {String}        status  
     * @return undefined
     */
    function updateStatus(incident_id, status) {
        $.ajax({
            url: baseURL+'/admin/incidents/update-status',
            type: 'POST',
            data: {incident_id: incident_id, status: status},
        })
        .done(function(data) {
            console.log("success");
            if(data.status==true) {

                var changed_count = 1;
                if(typeof incident_id!="number") {
                    // Was bulk action
                    changed_count = incident_id.length;
                    selected_recordId_arr = [];
                    // Reset bulk selections
                    resetBulkSelection();
                } else {
                    // Remove updated record from bulk action if exists
                    updateToBulk(incident_id, 'remove');
                    
                    // Fetch details
                    if(!$("#detail_container").hasClass('d-none') && incident_id==selectedIncidentId)
                        fetchIncidentDetail(incident_id);
                }

                // Update DataTable
                reloadDataTable(true);

                // Update the counts
                if(status!='delete') {
                    var $statusTab = $(".status-filter[data-status="+status+"]");
                    var prev_count = $statusTab.data('count');
                    $statusTab.find('.number-tags').text(prev_count+changed_count);
                    $statusTab.data('count', prev_count+changed_count);
                }

                // Reduce current status count
                var $activeStatusTab = $(".status-filter.active");
                var prev_count = $activeStatusTab.data('count');
                $activeStatusTab.find('.number-tags').text(prev_count-changed_count);
                $activeStatusTab.data('count', prev_count-changed_count);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }

    //////////////////////
    // Incident Details //
    //////////////////////

    var selectedIncidentId = 0; 
    function fetchIncidentDetail(incidentId) {
        selectedIncidentId = incidentId;
        $.ajax({
            url: baseURL+'api/reported-incident/details',
            type: 'POST',
            data: {incident_id: selectedIncidentId},
        })
        .done(function(data) {
            console.log("success");
            console.log(data);
            if(data.status) {
                var incidentData = data.data;

                // Set Details
                setDetailData(incidentData);

                // Get Questions and options
                hideEdit();
                incidentEditForm.init(incidentData);


                // Change to SPlit view
                enableSplitView();
            } else {
                // things went wrong!
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }

    // Set map
    var map = marker = null;
    
    function initializeDetailMap(latitude, longitude) {
        // Set the latitude & longitude for our location (London Eye)
        var myLatlng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: myLatlng, // Set our point as the centre location
            zoom: 14, // Set the zoom level
        };
                
        // Display a map on the page
        map = new google.maps.Map(document.getElementById("detail_map"), mapOptions);
                    
        // Add a marker to the map based on our coordinates
        marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
    }

    function updateMarker(latitude, longitude) {
        var location = new google.maps.LatLng(latitude, longitude);
        marker.setPosition(location);
        map.setCenter(location);
    }

    function setDetailActionButtons(status) {
        console.log('set deatail buttons for status', status);
        var actionHtml = '';
        if(status=='trashed')
            actionHtml += `<button data-status="delete" data-incidentid="${selectedIncidentId}" class="btn fs-17 text-red pl-0 detail-button action-update-status">Delete Forever</button>`;
        if(status!='trashed' && status!='pending_approval')
            actionHtml += `<button data-status="trashed" data-incidentid="${selectedIncidentId}" class="btn fs-17 text-red pl-0 detail-button action-update-status">Trash</button>`;
        if(status!='rejected' && status!='trashed')
            actionHtml += `<button data-status="rejected" data-incidentid="${selectedIncidentId}" class="btn fs-17 text-red pl-0 detail-button action-update-status">Reject</button>`;
        if(status!='saved')
            actionHtml += `<button data-status="saved" data-incidentid="${selectedIncidentId}" class="btn fs-17 text-red pl-0 detail-button action-update-status">Save</button>`;
        actionHtml += `<button class="btn fs-17 text-grey pl-0 detail-button" id="editField">Edit</button>`;
        actionHtml += `<button class="btn fs-17 text-grey pl-0 edit-button" id="saveChanges">Save</button>`;
        if(status!='approved' && status!='published')
            actionHtml += `<button data-status="approved" data-incidentid="${selectedIncidentId}" class="btn fs-17 text-primary pl-0 detail-button action-update-status">Approve</button>`;
        if(status!='published')
            actionHtml += `<button data-status="published" data-incidentid="${selectedIncidentId}" class="btn btn btn-primary fs-17 detail-button action-update-status">Publish</button>`;
        $("#detail_actions").html(actionHtml);
    }

    function setDetailData(incidentData) {
        // Set Incident Map
        if(map==null && google) {
            initializeDetailMap(incidentData.latitude, incidentData.longitude);
        } else {
            updateMarker(incidentData.latitude, incidentData.longitude);
        }

        // Set Action buttons
        setDetailActionButtons(incidentData.status);

        var answers = incidentData.answers;

        // Set Detail Data
        $("#datail_id").text("#"+incidentData.id);
        $("#detail_category_title").text(incidentData.categories);
        $("#detail_created_by").text(incidentData.posted_by);
        $("#detail_description").val(incidentData.description);
        $("#detail_reporting_for").val(answers.primary.sharing_for.answer);
        $("#detail_age").val(incidentData.age);
        $("#detail_gender").val(incidentData.gender);
        $("#detail_date").val(incidentData.incident_date);
        $("#detail_time").val(incidentData.time_from);
        $("#detail_categories").val(incidentData.categories);
        $("#detail_medical_help").val(answers.primary.medical_help?.answer);
        $("#detail_police").val(answers.primary.reported_to_police?.answer);
        // Address
        $("#detail_locality").val(incidentData.building);
        $("#detail_landmark").val(incidentData.landmark);
        $("#detail_city").val(incidentData.city);
        $("#detail_state").val(incidentData.state);
        $("#detail_country").val(incidentData.country);
        $("#detail_address").val(incidentData.building+' '+incidentData.landmark+', '+incidentData.city+', '+incidentData.state+', '+incidentData.country);

        // Set secondary form answers
        var form_answers = Object.values(answers);
        var html = '';
        for (var i = 1; i < form_answers.length; i++) {
            var otherFormAnswers = Object.values(form_answers[i]);
            for (var j = 0; j < otherFormAnswers.length; j++) {
                var answer = otherFormAnswers[j];
                html += `
                    <div class="col-12">
                        <div class="label fs-15">${answer.question}</div>
                        <input class="form-control" disabled="" value="${answer.answer}">
                    </div>
                `;
            }
        }
        $("#detail_other_forms").html(html);
    }

    // Code by Arham
    function setDetailViewHeight() {
        var scrollHeight = $(".dataTables_scrollBody").height() -45;
        $(".table-open__content").css("height", scrollHeight);
    }

    /////////////////////
    // Update Incident //
    /////////////////////
    function showEdit() {

        // Init Edit Map
        console.log('initiating map');
        editaddressForm.initMap();

        $("#edit_div").show();
        $(".edit-field__content").hide();

        // Toggle buttons
        $(".detail-button").hide();
        $(".edit-button").show();
    }

    function hideEdit() {
        $("#edit_div").hide();
        $(".edit-field__content").show();

        // Toggle Buttons
        $(".detail-button").show();
        $(".edit-button").hide();
    }

    $(document).on('click', '#saveChanges', function(event) {
        event.preventDefault();
        if(!incidentEditForm.valid())
            return false;
        console.log('form is valid! Yeah!');
        var answersArr = incidentEditForm.getAnswers();
        console.log(answersArr);

        // Send Update Request
        $.ajax({
            url: baseURL+'admin/incidents/update-incident',
            type: 'POST',
            data: {incident_id: selectedIncidentId, incident_data: answersArr},
        })
        .done(function(data) {
            console.log("success");
            console.log(data);
            if(data.status==true) {
                fetchIncidentDetail(selectedIncidentId);
                // Hide edit form
                /*hideEdit();

                // Toggle buttons
                $(".detail-button").show();
                $(".edit-button").hide();*/
            } else {
                alert(data.message);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        /* Act on the event */
    });

    $(document).on('click', '#editField', function(event) {
        event.preventDefault();
        // Show edit form
        showEdit();
    });

    //////////////////////
    // Add New Incident //
    //////////////////////

    $("#create-new-button").click(function(event) {
        event.preventDefault();
        // Reset Form
        localStorage.removeItem("clientForms");
        localStorage.removeItem("dynamicQuestionOptionJson");
        localStorage.removeItem("incident_id");
        localStorage.removeItem("currentQuestion");
        localStorage.removeItem("currentParentKey");
        localStorage.removeItem("currentTreeOptions");
        localStorage.removeItem("selectedAnswers");
        localStorage.removeItem("dynamicQuestionJson");
        localStorage.removeItem("currentForm");
        localStorage.removeItem("dependedQuestionsAnswers");
        localStorage.removeItem("totalQuestions");
        localStorage.removeItem("totalParentAnswers");
        localStorage.removeItem("isThankYouPage");

        // Redirect to create page
        window.location.href = baseURL+'admin/incidents/create';
    });

});