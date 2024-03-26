var incidentEditForm = (function () {
	
	var questionsObj = {};
var categories = []
	function init(incidentData,baseURL,category) {
		categories = category
		// Get all question ids
		console.log(incidentData,baseURL,category)
		var allForms = Object.values(incidentData.answers);
		var question_id_arr = [];
		for (var i = 0; i < allForms.length; i++) {
			var formAnswers = Object.values(allForms[i]);
			for (var j = 0; j < formAnswers.length; j++) {
				question_id_arr.push(formAnswers[j].question_id);
			}
		}

		// Fetch questions with options for answered questions
		$.ajax({
			url: baseURL + "get-questions-options",
			type: "POST",
			data: { ques_id: question_id_arr },
		})
			.done(function (data) {
				console.log("success");
				console.log(data);
				if (data.status == true) {
					console.log("in edit!");
					$("#edit_div").html("");
					questionsObj = data.data;
					// Iterate through all forms
					for (var i = 0; i < allForms.length; i++) {
						var formAnswers = Object.values(allForms[i]);
						// Iterate through answers in current form
						for (var j = 0; j < formAnswers.length; j++) {
							var answerObj = formAnswers[j];
							// Create appropriate Question element for current answer
							var questionHTML = renderQuestion(
								questionsObj,
								answerObj,
								incidentData
							);
							$("#edit_div").append(questionHTML);
							
									

						}
					}

					// Reorder questions
					var divList = $(".question-listing-item");
					divList.sort(function (a, b) {
						return (
							$(a).data("questionid") - $(b).data("questionid")
						);
					});
					$("#edit_div").html(divList);

					// Initialize Events
					initializeEvents();
				}
			})
			.fail(function () {
				console.log("error");
			})
			.always(function () {
				console.log("complete");
			});
	}
	
	var tdateset = false
	var tdateset1 = false

	function initializeEvents() {
		editaddressForm.initMap();
		/////////////////////////////
		// Set Incident Datepicker //
		/////////////////////////////
		var todaydate = new Date();
		var datePicker = $("#datepicker .parent-option-field").val();
		console.log(datePicker);
		// $('#datepicker').datetimepicker({
		//      format: 'YYYY-MM-DD', 
		//      todayHighlight: true,
		//      toolbarplacement: 'bottom',
		//      showClose: true,
		//      endDate: todaydate,
		//      maxDate: todaydate,
		//      icons: { 
		//        close: 'OK'
		//      },
		//      ignoreReadonly: true,
		// });
		// $('#datepicker').data("datetimepicker").date(moment(datePicker));

		///////////////////////////////////////////////
		// Set Incident Timepicker / TimeRangePicker //
		///////////////////////////////////////////////
		var timePicker = $("#timepicker .parent-option-field").val();
        var timePickerStart = $("#timerangepickerstart .parent-rangestart-field").val();
        var timePickerEnd   = $("#timerangepickerend .parent-rangeend-field").val();
		// $("#timepicker, #timerangepickerstart, #timerangepickerend").datetimepicker({
        //     format: 'LT',
        //     ignoreReadonly: true,
        //     useCurrent: false
        //     /*buttons: {
        //     	showClear: true
        //     },
        //     icons: { 
        //     	clear: 'fa fa-trash'
        //     },
        //     showClear: true*/
        // });
        
        // // Set Initial Time
        // $('#timepicker').data("datetimepicker").date(moment(timePicker));
        // $('#timerangepickerstart').data("datetimepicker").date(moment(timePickerStart));
        // $('#timerangepickerend').data("datetimepicker").date(moment(timePickerEnd));

        // Set timepicker event
        // $("#timepicker").on("change.datetimepicker", function (e) {
        // 	// Disable Rangepicker
        // 	$(".timerangepicker-container").addClass('nonactive');
        // 	validateAnswers();
        // });

        // Add dependency on timerangepickers
        // $("#timerangepickerstart").on("change.datetimepicker", function (e) {
        // 	// Disable single timepicker
        // 	$(".timepicker-container").addClass('nonactive');

        // 	// Restrict time selection
        //     $('#timerangepickerend').datetimepicker('minDate', e.date);
        //     $('#timerangepickerend').datetimepicker('maxDate', moment(e.date).set({"hour": 23, "minute": 59}));
        // 	validateAnswers();
        // });
        // $("#timerangepickerend").on("change.datetimepicker", function (e) {
        // 	// Disable single timepicker
        // 	$(".timepicker-container").addClass('nonactive');

        // 	// Restrict time selection
        //     $('#timerangepickerstart').datetimepicker('minDate', moment(e.date).set({"hour": 00, "minute": 00}));
        //     $('#timerangepickerstart').datetimepicker('maxDate', e.date);
        // 	validateAnswers();
		// });
		

		$(".tdateset").click(function(event) {
			event.preventDefault();
			 tdateset = true
			 tdateset1 = false
		})

		$(".tdateset1").click(function(event) {
			event.preventDefault();
			tdateset = false
			tdateset1 = true
		})

		$(".tdateset2").click(function(event) {
			event.preventDefault();
			tdateset = false
			tdateset1 = true
		})

        // Clear Time/TimeRange values
        $(".clearTime").click(function(event) {
        	event.preventDefault();
        	$(".t").val('');
        	console.log('time')
        	//$("#timepicker").data("datetimepicker").clear();
        	/*$("#timerangepickerstart").data("datetimepicker").clear();
        	$("#timerangepickerend").data("datetimepicker").clear();*/
			// Enable Timepicker/Timerange picker
			$(".timepicker-container").addClass('nonactive');
        	$(" .timerangepicker-container").removeClass('nonactive');
		});
		
		// Clear Time/TimeRange values
        $(".clearTimeRange").click(function(event) {
			event.preventDefault();
			console.log('timerange')
        	$(".t1 ").val('');
        	$(".t2 ").val('');
        	/*$("#timepicker").data("datetimepicker").clear();*/
        //	$("#timerangepickerstart").data("datetimepicker").clear();
        //	$("#timerangepickerend").data("datetimepicker").clear();
			// Enable Timepicker/Timerange picker
			$(" .timerangepicker-container").addClass('nonactive');
			$(".timepicker-container ").removeClass('nonactive');
        	
        });

		/////////////////////////////////
		// Check validations on events //
		/////////////////////////////////
		$(".parent-option-field[type=text]").keydown(function (event) {
			var questionId = $(this).parent('.question-listing-item').data('questionid');
			if(questionId!=undefined && questionsObj[questionId]!=undefined) {
				var validationArr = JSON.parse(questionsObj[questionId].question.properties).validations;
				var validation_type = validationArr[1].type != null ? validationArr[1].type : "text";
			} else {
				var validation_type = 'text';
			}
			if(validation_type=='number') {
				var key = event.charCode || event.keyCode || 0;
	            // allow backspace, tab, enter, delete, arrows, numbers and keypad numbers ONLY
	            // home, end
				var isValidInput =  
				                key == 8 || 
				                key == 9 ||
				                key == 13 ||
				                key == 46 ||
				                (key >= 35 && key <= 40) ||
				                (key >= 48 && key <= 57) ||
				                (key >= 96 && key <= 105);
				if(!isValidInput) {
					return false;
				}
			}
		});

		$(".parent-option-field[type=text]").keyup(function (event) {
			validateAnswers();
		});

		// Run validation for suboptions
		$(".suboption-field[type=text]").keyup(function(event) {
			validateAnswers();
		});

		$(".suboption-field[type=checkbox], .suboption-field[type=radio]").click(function (event) {
			validateAnswers();
		});

		// On Radio options click
		// Toggle visibility of subtext and suboptions fields
		$(document).on("click", ".parent-option-field[type=radio]", function (event) {
			// Hide all textboxes for selected question
			$(this)
				.closest(".question-listing-item")
				.find("input[type=text].suboption-field")
				.addClass("d-none");
			// Show texbox if selected option has one
			if ($(this).data("hassubtext") && $(this).is(":checked"))
				$(this).siblings(".suboption-field").removeClass("d-none");

			// Hide all suboptions for selected question
			$(this)
				.closest(".question-listing-item")
				.find(".suboption-container")
				.addClass("d-none");
			$(this)
				.closest(".question-listing-item")
				.find(".suboption-container .suboption-field")
				.prop("checked", false);

			// Show Suboption if selected option has one
			if ($(this).data("hassuboption") != false)
				$(this).siblings(".suboption-container").removeClass("d-none");

			// Run validation
			validateAnswers();
		});

		// On Checkbox options click
		// Toggle visibility of subtext and suboptions fields
		$(document).on("click", ".parent-option-field[type=checkbox]", function (event) {
			if ($(this).data("hassubtext")) {
				if ($(this).is(":checked")) {
					$(this)
						.siblings(".suboption-field")
						.removeClass("d-none");
				} else {
					$(this).siblings(".suboption-field").addClass("d-none");
				}
			} else if ($(this).data("hassuboption") != false) {
				if ($(this).is(":checked")) {
					$(this)
						.siblings(".suboption-container")
						.removeClass("d-none");
				} else {
					$(this)
						.siblings(".suboption-container")
						.find(".suboption-field")
						.prop("checked", false);
					$(this)
						.siblings(".suboption-container")
						.addClass("d-none");
				}
			}

			// Run validation
			validateAnswers();
		});
	}

	function renderQuestion(questionsObj, answerObj, incidentData) {
		var question_id = answerObj.question_id;
		var question = questionsObj[question_id].question;
		var question_properties = JSON.parse(question.properties);
		var suboptions = questionsObj[question_id].suboptions || {};
		var options = questionsObj[question_id].options;
		var questionHtml = "";
		questionHtml += `
	        <div class="question-listing-item col-12" 
	        	data-answerdetailid="${answerObj.detail_id}" 
	        	data-questiontype="${question_properties.type}" 
	        	data-questionid="${question.id}" 
	        	data-questiontag="${question.tags}"
	        >
	            <div class="label newquestion fs-15">${question.question}</div>
	    `;
		var optionHtml = "";
		switch (question_properties.type) {
			case "radio":
				options.forEach(function (option) {
					var answerIdArr = answerObj.answer_id.split(",");
					var isSelected = answerIdArr.includes(option.id);
					var hassuboption =
						option.suboption_properties != null
							? JSON.parse(option.suboption_properties).type
							: false;
					optionHtml += `
	                    <div class="inputGroup custom-control">
	                      <input type="radio" id="option${
								option.id
							}" name="option${question_id}" class="custom-control-input parent-option-field" ${
						isSelected ? "checked" : ""
					} value="${option.id}" data-hassubtext="${
						option.textbox_placeholder != null
					}" data-hassuboption="${hassuboption}">
	                      <label class="custom-control-label label1" for="option${
								option.id
							}">${option.title}</label>
	                `;
					// Suboption text field
					if (option.textbox_placeholder != null)
						optionHtml += renderSubText(
							answerObj,
							option,
							isSelected
						);
					else if (hassuboption != false) {
						var elemsuboptions = suboptions[option.id];
						optionHtml += renderSubOptions(
							question_id,
							answerIdArr,
							hassuboption,
							elemsuboptions,
							isSelected
						);
					}
					optionHtml += "</div>";
				});
				break;

			case "checkbox":
				if (question.is_category == true) {
					var options = [];
					categories.forEach(function (category) {
						options.push({
							id: category.id,
							textbox_placeholder: null,
							title: category.title,
							parent_id: category.parent_id,
							is_main: category.is_main,
						});
					});
				}
				options.forEach(function (option) {
					var answerIdArr = answerObj.answer_id.split(",");
					var isSelected = answerIdArr.includes(option.id);
					var hassuboption =
						option.suboption_properties != null
							? JSON.parse(option.suboption_properties).type
							: false;
					var fieldId =
						question.is_category == true
							? "catoption" + option.id
							: "option" + option.id;
					optionHtml += `
	                    <div class="inputGroup custom-control">
	                      <input class="form-check-input parent-option-field" type="checkbox" id="${fieldId}" name="${question_id}" ${
						isSelected ? "checked" : ""
					}  value="${option.id}" data-hassubtext="${
						option.textbox_placeholder != null
					}" data-hassuboption="${hassuboption != null}">
	                      <label class="custom-control-label label1" for="${fieldId}">
	                        ${option.title}
	                      </label>
	                `;
					// Suboption text field
					if (option.textbox_placeholder != null)
						optionHtml += renderSubText(
							answerObj,
							option,
							isSelected
						);
					else if (hassuboption != false) {
						var elemsuboptions = suboptions[option.id];
						optionHtml += renderSubOptions(
							question_id,
							answerIdArr,
							hassuboption,
							elemsuboptions,
							isSelected
						);
					}
					optionHtml += "</div>";
				});
				break;

			case "text":
				var isRequired = question_properties.validations?.[0].required!=undefined;
				optionHtml += `
	                <input type="text" id="option${question_id}text" class="form-control parent-option-field inputsecondin" value="${answerObj.answer}" data-required="${isRequired}" />
	            `;
				break;

			case "estimate-datepicker":
				validateAnswers();
				var isEstimate =
					incidentData.is_date_estimate == 0 ? true : false;
				optionHtml += `
				  <div class="new">
     <ion-datetime class="input-group-append timePick timepicker estimate-datepicker parent-option-field" id="timepicker" value="${incidentData.incident_date}"   displayFormat="YYYY-MM-DD" name="" placeholder="Select Time" ></ion-datetime>
     <ion-icon name="" class="newcal" slot="end"></ion-icon>
     
     </div>

	                <label class="custom-checkbox estimate">
					This is an estimate
	                    <input type="checkbox" class="estimate1" type="checkbox" id="option${question_id}checked" name="option${question_id}" ${isEstimate ? "checked" : ""} >
	                    <span class="checkmark"></span>
	                </label>
				`;
			
				break;
	            // <input type="text" id="option${question_id}" class="form-control estimate-datepicker parent-option-field" value="${incidentData.incident_date}" />

			case "estimate-time-or-rangepicker":
				validateAnswers();
				var isEstimate =
					incidentData.is_time_estimate == 0 ? true : false;
				var isRange = incidentData.time_to != null;
				optionHtml += `
					<div class="row timepicker-container ${isRange?'nonactive':''}">
						<div >
							<div class="new">
     <ion-datetime class="input-group-append timePick timepicker t tdateset parent-option-field datetimepicker-input" id="option${question_id}text" value="${!isRange ? incidentData.time_from : ""}" picker-format="hh : mm A" display-format="hh : mm A" name="" placeholder="Select Time" ></ion-datetime>
     <ion-icon name="" class="newtime" slot="end"></ion-icon>
     
     </div>
						</div>
						<div class="newclear">
							<a class="clearTime btn animated fadeInUp pull-right mt-0 themeColor">Clear Time</a>
		                </div>
					</div>
					 <label class="custom-checkbox estimate for="option${question_id}checked"">
This is an estimate
  
  <input class="estimate1 parent-estimate-field" type="checkbox" id="option${question_id}checked" name="option${question_id}" ${isEstimate ? "checked" : ""} >
  <span class="checkmark"></span>

                     </label>
	               <div class="newadd">OR</div>
					<div class=" timerangepicker-container ${!isRange?'nonactive':''}">
						<div class="newlabeltext">
							<label>Select Time Range</label>
						</div>
						
							<div class="newsidetime">
	    						<div class="new">
     <ion-datetime id="timerangepickerstart" class="input-group-append t1 tdateset1 rangeTime selectTime startTime parent-rangestart-field datetimepicker-input" value="${isRange? incidentData.time_from: ''}"  picker-format="hh : mm A" display-format="hh : mm A" name="" placeholder="Select Time" ></ion-datetime>
     <ion-icon name="" class="newtime" slot="end" ></ion-icon>
     </div>
	                    	</div>
							<div class="centertext">
	                        	<span>To</span>
	                      	</div>
							<div class="newsidetime">
			                    <div class="new">
     <ion-datetime id="timerangepickerend" class="input-group-append t2 tdateset2 rangeTime selectTime endTime parent-rangeend-field datetimepicker-input" value="${isRange ? incidentData.time_to : ''}"  picker-format="hh : mm A" display-format="hh : mm A" name="" placeholder="Select Time"  ></ion-datetime>
     <ion-icon name="" class="newtime" slot="end"></ion-icon>
     </div>
	
						</div>
						<div class="newclear">
                          <a class="clearTimeRange btn newclear">Clear Time Range</a>
                        </div>
					</div>
	        	`;
	            //<input type="time" id="option${question_id}" class="form-control parent-option-field" value="${incidentData.time_to == null ? incidentData.time_from : ""}" />
                //<input type="time" class="form-control parent-rangestart-field" value="${incidentData.time_to != null? incidentData.time_from: ''}" />
                //<input type="time" class="form-control parent-rangeend-field" value="${incidentData.time_to != null ? incidentData.time_to : ''}" />
				break;

			case "incident-address-form":
				optionHtml += editaddressForm.init(
					incidentData.latitude,
					incidentData.longitude,
					incidentData.building,
					incidentData.landmark,
					incidentData.area,
					incidentData.city,
					incidentData.state,
					incidentData.country
				);
				break;

			default:
				break;
		}

		optionHtml += '<div class="invalid-msg text-danger"></div>';
		questionHtml += optionHtml + "</div>";
		return questionHtml;
	}

	function renderSubText(answerObj, option, isSelected) {
		var optionHtml;
		var otherAnswer = JSON.parse(answerObj.other_answers);
		console.log(otherAnswer);
		try {
			var placeholder = JSON.parse(option.textbox_placeholder)
				.placeholder;
		} catch {
			var placeholder = option.textbox_placeholder;
		}
		optionHtml = `
	        <input type="text" class="form-control ${
				isSelected ? "" : "d-none"
			} suboption-field" value="${
			otherAnswer[option.id] != undefined ? otherAnswer[option.id] : ""
		}" placeholder="${placeholder}" />
	    `;
		optionHtml += '<div class="invalid-msg text-danger"></div>';
		return optionHtml;
	}

	function renderSubOptions(
		question_id,
		answerIdArr,
		hassuboption,
		elemsuboptions,
		isSelected
	) {
		var optionHtml = `<div class="suboption-container ${
			isSelected ? "" : "d-none"
		}">`;
		elemsuboptions.forEach(function (elemsuboption) {
			var isSubOptionSelected = answerIdArr.includes(elemsuboption.id);
			if (hassuboption == "checkbox") {
				optionHtml += `
	                <div class="form-check">
	                  	<input class="form-check-input suboption-field" type="checkbox" id="suboption${
							elemsuboption.id
						}" name="suboption${question_id}" value="${
					elemsuboption.id
				}" data-hassubtext="${
					elemsuboption.textbox_placeholder != null
				}" ${isSubOptionSelected ? "checked" : ""}>
	                  	<label class="form-check-label" for="suboption${
							elemsuboption.id
						}">
	                    	${elemsuboption.title}
	                  	</label>
	                </div>
	            `;
			} else if (hassuboption == "radio") {
				optionHtml += `
	                <div class="custom-control custom-radio">
	                  	<input type="radio" id="suboption${
							elemsuboption.id
						}" name="suboption${question_id}" class="custom-control-input suboption-field" ${
					isSelected ? "checked" : ""
				} value="${elemsuboption.id}" data-hassubtext="${
					elemsuboption.textbox_placeholder != null
				}" ${isSubOptionSelected ? "checked" : ""}>
	                  	<label class="custom-control-label" for="suboption${
							elemsuboption.id
						}">${elemsuboption.title}</label>
	                </div>
	            `;
			}
		});
		optionHtml += '<div class="invalid-msg text-danger"></div>';
		optionHtml += "</div>";
		return optionHtml;
	}

	function getAnswers() {
		var answersArr = [];
		$(".question-listing-item").each(function (index, el) {
			var type = $(el).data("questiontype");
			var questionId = $(el).data("questionid");
			var answerId = $(el).data("answerdetailid");
			var tags = $(el).data("questiontag");
			console.log($(el).data("answerjson"));
			var answerObj = {
				id: answerId,
				question_id: questionId,
				question_type: type,
				question_tag: tags,
				answer_id: "",
				answer: "",
				//'other_answers': {},
				//'answer_json': answer_json
			};
			switch (type) {
				case "text":
					answerObj.answer = $(el).find(".parent-option-field").val();
					break;

				case "radio":
					var radio_other_answers = {};
					var selectedOptionElem = $(el).find(
						".parent-option-field:checked"
					);
					var checkbox_answers = selectedOptionElem.val();
					// Set Subtext value if any
					if ($(selectedOptionElem).data("hassubtext"))
						radio_other_answers[answerObj.answer_id] = $(
							selectedOptionElem
						)
							.siblings(".suboption-field")
							.val();
					// Set Suboption value if any
					$(el)
						.find(".parent-option-field:checked")
						.siblings(".suboption-container")
						.find(".suboption-field:checked")
						.each(function (checkedInder, checkedEl) {
							checkbox_answers += "," + $(checkedEl).val();
						});
					answerObj.answer_id = checkbox_answers;
					answerObj.other_answers = JSON.stringify(
						radio_other_answers
					);
					break;

				case "checkbox":
					var checkbox_answers = "";
					var checkbox_other_answers = {};
					$(el)
						.find(".parent-option-field:checked")
						.each(function (checkedIndex, checkedEl) {
							checkbox_answers += "," + $(checkedEl).val();
							// Set Subtext value if any
							if ($(checkedEl).data("hassubtext"))
								checkbox_other_answers[$(checkedEl).val()] = $(
									checkedEl
								)
									.siblings(".suboption-field")
									.val();
							// Set Suboption value if any
							if ($(checkedEl).data("hassuboption") != false) {
								$(checkedEl)
									.siblings(".suboption-container")
									.find(".suboption-field:checked")
									.each(function (checkedInder, checkedEl) {
										checkbox_answers +=
											"," + $(checkedEl).val();
									});
							}
						});
					answerObj.answer_id = checkbox_answers.replace(/^,/, "");
					answerObj.other_answers = JSON.stringify(
						checkbox_other_answers
					);
					break;

				case "estimate-datepicker":
					answerObj.answer_id = 0;
					answerObj.answer = $(el).find(".parent-option-field").val();
					console.log('----------',answerObj.answer)
					answerObj.answer  = GetFormattedDate(answerObj.answer)
					console.log('----------',answerObj.answer)
					//answerObj.isEstimate = $(el).find('.parent-estimate-field').is(':checked');
					var isEstimate = $(el)
						.find(".parent-estimate-field")
						.is(":checked");

					// Set AnswerJson
					answerObj.answer_json = {};
					answerObj.answer_json.option_id = 0;
					answerObj.answer_json.answer = answerObj.answer;
					answerObj.answer_json.isEstimate = isEstimate;
					answerObj.answer_json = JSON.stringify(
						answerObj.answer_json
					);
					break;

				case "estimate-time-or-rangepicker":
					var time = $(el).find(".parent-option-field").val();
					var start_time = $(el).find(".parent-rangestart-field").val();
					var end_time = $(el).find(".parent-rangeend-field").val();
					console.log(time)
					console.log(start_time)
					console.log(end_time)
					console.log(tdateset)
					console.log(tdateset1)
					if(time)
					{
						console.log(tdateset)
						var l = time.length
						console.log(l)
						if(tdateset == true && l > 8)
						{
						var time = JSON.stringify(time);
						
						var date1 = time.split('T')
						console.log(date1)
						console.log(date1[0])
						console.log(date1[1])
						console.log(date1[1].split('.'))
				
						var time2 = date1[1].split('.')
						var final_date = time2[0]
						console.log(final_date)
						var time_split = final_date.split(':')
						console.log(time_split)
						if (time_split[0].charAt(0) == '0') {
						  var t = time_split[0].slice(1)
						  time_split[0] = t;
						  console.log(time_split[0])
						}
						if (time_split[1].charAt(0) == '0') {
						  var t = time_split[1].slice(1)
						  time_split[1] = t;
						  console.log(time_split[1])
						}
							
						let hour = JSON.parse(time_split[0])
						let minute = JSON.parse(time_split[1])
				
						console.log(hour)
						console.log(minute)
						var hours = hour > 12 ? hour - 12 : hour;
						var am_pm = hour >= 12 ? "PM" : "AM";
						var minutes = minute < 10 ? "0" + minute : minute;
						time = hours + ":" + minutes + " " + am_pm;
						
						}
						else{
								console.log('sfjbs',time)
								var time_split = time.split(':')
								console.log(time_split)
								if (time_split[0].charAt(0) == '0') {
									var t = time_split[0].slice(1)
									time_split[0] = t;
									console.log(time_split[0])
								  }
								  if (time_split[1].charAt(0) == '0') {
									var t = time_split[1].slice(1)
									time_split[1] = t;
									console.log(time_split[1])
								  }
								let hour = JSON.parse(time_split[0])
						let minute = JSON.parse(time_split[1])
				
						console.log(hour)
						console.log(minute)
						var hours = hour > 12 ? hour - 12 : hour;
						var am_pm = hour >= 12 ? "PM" : "AM";
						var minutes = minute < 10 ? "0" + minute : minute;
						time = hours + ":" + minutes + " " + am_pm;
						
						}
					}		
					else
					{
						console.log(tdateset1)
						var l = start_time.length
						console.log(l)
						var j = end_time.length
						console.log(j)
						if(tdateset1 == true && j > 8 && l > 8)
						{
							//for timestart
							var time = JSON.stringify(start_time);							
							var date1 = time.split('T')
							console.log(date1)
							console.log(date1[0])
							console.log(date1[1])
							console.log(date1[1].split('.'))
				  
							var time2 = date1[1].split('.')
							var final_date = time2[0]
							console.log(final_date)
							var time_split = final_date.split(':')
							console.log(time_split)
				  
							if (time_split[0].charAt(0) == '0') {
							  var t = time_split[0].slice(1)
							  time_split[0] = t;
							  console.log(time_split[0])
							}
							if (time_split[1].charAt(0) == '0') {
							  var t = time_split[1].slice(1)
							  time_split[1] = t;
							  console.log(time_split[1])
							}
				  
				  
							let hour = JSON.parse(time_split[0])
							let minute = JSON.parse(time_split[1])
				  
							console.log(hour)
							console.log(minute)
							var hours = hour > 12 ? hour - 12 : hour;
							var am_pm = hour >= 12 ? "PM" : "AM";
							var minutes = minute < 10 ? "0" + minute : minute;
							start_time = hours + ":" + minutes + " " + am_pm;
				  
				  
							//for timeend
							var timeend = JSON.stringify(end_time);
							
							var dateend1 = timeend.split('T')
							console.log(dateend1)
							console.log(dateend1[0])
							console.log(dateend1[1])
							console.log(dateend1[1].split('.'))
				  
							var timeend2 = dateend1[1].split('.')
							var final_enddate = timeend2[0]
							console.log(final_enddate)
							var time_split_end = final_enddate.split(':')
							console.log(time_split_end)
				  
							if (time_split_end[0].charAt(0) == '0') {
							  var t = time_split_end[0].slice(1)
							  time_split_end[0] = t;
							  console.log(time_split_end[0])
							}
							if (time_split_end[1].charAt(0) == '0') {
							  var t = time_split_end[1].slice(1)
							  time_split_end[1] = t;
							  console.log(time_split_end[1])
							}
				  
				  
							let hourend = JSON.parse(time_split_end[0])
							let minuteend = JSON.parse(time_split_end[1])
				  
							console.log(hourend)
							console.log(minute)
							var hoursend = hourend > 12 ? hourend - 12 : hourend;
							var am_pm_end = hourend >= 12 ? "PM" : "AM";
							var minutesend = minuteend < 10 ? "0" + minuteend : minuteend;
							end_time = hoursend + ":" + minutesend + " " + am_pm_end;
				  
				  
							var day = '1 1 1970 ',  // 1st January 1970
						
							hourDiff = ( Date.parse(day + end_time) - Date.parse(day + start_time) ) / 1000 / 60;
							console.log(hourDiff + ' min');
						
						
				  
				  
							if (hourDiff < 0) {
							  if (!$('.timeRange').next('.timeRange_valid').length) {
								//$('.timeRange').after('<div class="validdation_time" style="color:red;">' + properties["validations"][0]["timediff"] + '</div>');
								
							  }
							  $('.timeRange').after('<div class="timeRange_valid" style="color:red;">End Time is Less Than Start Time.</div>');
							//  $("#dynamicNext").attr("disabled", "disabled");
							  return false;
							}
				  
				  
						
							
						}
						else
						{
								if(start_time && end_time)
								{
										//starttime
										console.log('sfjbs',start_time)
										var time_split = start_time.split(':')
										console.log(time_split)
										if (time_split[0].charAt(0) == '0') {
											var t = time_split[0].slice(1)
											time_split[0] = t;
											console.log(time_split[0])
										}
										if (time_split[1].charAt(0) == '0') {
											var t = time_split[1].slice(1)
											time_split[1] = t;
											console.log(time_split[1])
										}
										let hour1 = JSON.parse(time_split[0])
								let minute = JSON.parse(time_split[1])
						
								console.log(hour1)
								console.log(minute)
								var hours = hour1 > 12 ? hour1 - 12 : hour1;
								var am_pm = hour1 >= 12 ? "PM" : "AM";
								var minutes = minute < 10 ? "0" + minute : minute;
								start_time = hours + ":" + minutes + " " + am_pm;

								//endtime
								console.log('sfjbs',end_time)
										var time_split = end_time.split(':')
										console.log(time_split)
										if (time_split[0].charAt(0) == '0') {
											var t = time_split[0].slice(1)
											time_split[0] = t;
											console.log(time_split[0])
										}
										if (time_split[1].charAt(0) == '0') {
											var t = time_split[1].slice(1)
											time_split[1] = t;
											console.log(time_split[1])
										}
										let hour = JSON.parse(time_split[0])
								let minute1 = JSON.parse(time_split[1])
						
								console.log(hour)
								console.log(minute1)
								var hours = hour > 12 ? hour - 12 : hour;
								var am_pm = hour >= 12 ? "PM" : "AM";
								var minutes = minute1 < 10 ? "0" + minute1 : minute1;
								end_time = hours + ":" + minutes + " " + am_pm;

								var day = '1 1 1970 ',  // 1st January 1970
						
							hourDiff = ( Date.parse(day + end_time) - Date.parse(day + start_time) ) / 1000 / 60;
							console.log(hourDiff + ' min');
						
						
				  
				  
							if (hourDiff < 0) {
							  if (!$('.timeRange').next('.timeRange_valid').length) {
								//$('.timeRange').after('<div class="validdation_time" style="color:red;">' + properties["validations"][0]["timediff"] + '</div>');
								//$('.timeRange').after('<div class="timeRange_valid" style="color:red;">End Time is Less Than Start Time.</div>');
							  }
							  $('.timeRange').after('<div class="timeRange_valid" style="color:red;">End Time is Less Than Start Time.</div>');
							//  $("#dynamicNext").attr("disabled", "disabled");
							  return false;
							}
						}
						else
						{
							return false;
						}		
						}
						console.log('else',tdateset1)
						console.log(start_time)
						console.log(end_time)
					}
					answerObj.answer_id = 0;
					answerObj.answer =
						start_time == "" || end_time == ""
							? time
							: start_time + "-" + end_time;
					//answerObj.isEstimate = start_time!='' && end_time!='' ? true:$(el).find('.parent-estimate-field').is(':checked');
					var isEstimate =
						start_time != "" && end_time != ""
							? true
							: $(el)
									.find(".parent-estimate-field")
									.is(":checked");

					// Set AnswerJson
					answerObj.answer_json = {};
					answerObj.answer_json.option_id = 0;
					answerObj.answer_json.answer = answerObj.answer;
					answerObj.answer_json.isEstimate = isEstimate;
					answerObj.answer_json = JSON.stringify(
						answerObj.answer_json
					);
					break;

				case "incident-address-form":
					answerObj.answer_id = 0;
					// Set AnswerJson
					answerObj.answer_json = {};
					//answerObj.address = editaddressForm.getAddress();

					answerObj.answer_json.address = editaddressForm.getAddress();
					answerObj.answer_json = JSON.stringify(
						answerObj.answer_json
					);
					break;

				default:
					break;
			}
			answersArr.push(answerObj);
		});
		return answersArr;
	}

	function GetFormattedDate(date) {

		// var todayTime = date.string
		console.log(date)
		var d = new Date(date),
		  month = '' + (d.getMonth() + 1),
		  day = '' + d.getDate(),
		  year = d.getFullYear();
	
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
	
		return [year ,month, day].join('/');
	
	  }

	function validateAnswers() {
		// Reset validations
		$(".is-invalid").removeClass("is-invalid");
		$(".invalid-msg").text("");

		var isValid = true;
		$(".question-listing-item").each(function (index, el) {
			var type = $(el).data("questiontype");
			var questionId = $(el).data("questionid");
			var answerId = $(el).data("answerdetailid");
			var tags = $(el).data("questiontag");
			if (type == "text" || type == "incident-address-form" || type=="estimate-datepicker") {
				var textInvalid = false;
				var $textElement = $(el).find(".parent-option-field[data-required=true]");
				$textElement.each(function(subIndex, subEl) {
					if($(subEl).val().trim() == "") {
						console.log('setting invalid for type', type);
						console.log($(el).data('questiontag'));
						isValid = false;
						textInvalid = true;
						$(subEl).addClass("is-invalid");
					} else {
						$(subEl).removeClass("is-invalid");
					}
				});

				if(textInvalid) {
					$(el).children(".invalid-msg").text("This Field is Required");
				} else {
					$(el).children(".invalid-msg").text("");
				}
			} 	else if(type == "estimate-time-or-rangepicker") {
				var timePicker 		= $("#timepicker .parent-option-field").val();
        		var timePickerStart = $("#timerangepickerstart .parent-rangestart-field").val();
        		var timePickerEnd   = $("#timerangepickerend .parent-rangeend-field").val();
        		if(timePicker=='' && (timePickerStart=='' || timePickerEnd=='')) {
        			console.log('setting invalid for type', type);
        			isValid = false;
        			$(el).children(".invalid-msg").text("This Field is Required");
    			} else {
        			$(el).children(".invalid-msg").text("");
    			}

			} else if (type == "checkbox" || type == "radio") {
				// Validate Parent Fields
				if ($(el).find(".parent-option-field:checked").length == 0) {
					console.log('setting invalid for type', type);
					isValid = false;
					$(el).find(".parent-option-field").addClass("is-invalid");
					$(el).children(".invalid-msg").text("This Field is Required");
				} else {
					// Remove validation
					$(el).find(".parent-option-field").removeClass("is-invalid");
					$(el).children(".invalid-msg").text("");
				}
				// Validate Subtext fields
				$(el)
					.find(".parent-option-field:checked")
					.each(function (subIndex, subEl) {
						// Validate subtext
						var $textElement = $(subEl).siblings(
							".suboption-field[type=text]"
						);
						if ($textElement.length > 0) {
							if ($textElement.val().trim() == "") {
								console.log('setting invalid for type', type);
								isValid = false;
								$textElement.addClass("is-invalid");
								$textElement
									.siblings(".invalid-msg")
									.text("This Field is Required");
							} else {
								// Remove validation
								$textElement.removeClass("is-invalid");
								$textElement.siblings(".invalid-msg").text("");
							}
						} else {
							// Validate suboptions
							var $suboptionContainer = $(subEl).siblings(
								".suboption-container"
							);
							if ($suboptionContainer.length > 0) {
								var $suboptions = $suboptionContainer.find(
									".suboption-field:checked"
								);
								if ($suboptions.length == 0) {
									console.log('setting invalid for type', type);
									isValid = false;
									$suboptions.addClass("is-invalid");
									$suboptionContainer
										.children(".invalid-msg")
										.text("This Field is Required");
								} else {
									// Remove validation
									$suboptions.removeClass("is-invalid");
									$suboptionContainer
										.children(".invalid-msg")
										.text("");
								}
							}
						}
					});
			}
		});
		console.log(isValid);
		return isValid;
	}

	return {
		init: function (incidentData,baseURL,category) {
			console.log(incidentData,baseURL,category)
			init(incidentData,baseURL,category);
			 tdateset = false
			 tdateset1 = false
		},
		valid: function () {
			return validateAnswers();
		},
		getAnswers: function () {
			return getAnswers();
		},
	};
})();
