"use strict";


var RSCQuestionSubmission = function() {
	var t = this;
	var api_url = "/admin";

	$("#_message").css('opacity', 0);

	this.get_uri = function(uri) {
		return api_url + '/?q=' + uri;
	}

	this.submit_question = function(params, callback) {
		console.log(t.get_uri('admin'));

		$.post(t.get_uri('send_message'), params, function(data) {
			
			callback(data);
		});
	}

	this.add_listeners = function() {
		$('#question_submit_form').submit(t.question_form_submit);
	}

	this.question_form_submit = function(e) {
		var form = $('#question_submit_form');

		e.preventDefault();

		var params = {
			school_name: $('#question-submit-form-school_name').val(),
			name: $('#question-submit-form-name').val(),
			body: $('#question-submit-form-body').val(),
			postcode: $('#question-submit-form-postcode').val(),
		};

		if (params.school_name == "" || params.name == "" || params.body == "" || params.postcode == "") {
			alert("Sorry! You must fill out all of the fields to submit a question.")
			return false;
		}

		t.submit_question(params, function(d) {
			console.log(d);

			$('#question-submit-form-school_name').val('')
			$('#question-submit-form-name').val('')
			$('#question-submit-form-body').val('')
			$('#question-submit-form-postcode').val('')

			t.message('Hello!')

		});

		return false;
	}

	this.add_listeners();

	this.perform_poll_checks = function(d) {
		if (d.questions_enabled) {
			t.enable_questions();
		} else {
			t.disable_questions();
		}
	}

	this.enable_questions = function() {
		$('#question_submit_form').removeClass('disabled');
		$('#question_submit_form').addClass('enabled');
		$('#question-submit-btn').removeAttr('disabled')

	}

	this.disable_questions = function() {
		$('#question_submit_form').addClass('disabled');
		$('#question_submit_form').removeClass('enabled');
		$('#question-submit-btn').attr('disabled', 'disabled')
	}


	this.poll = function() {
		$.get(t.get_uri('poll.json'), function(data){
			t.perform_poll_checks(data);
		});

		setTimeout(t.poll, 3000);
	}

	this.poll();

	this.message = function (t) {
		var msg = $("#_message");

		msg.css({
			opacity: 0,
			top: '-10px',
			visibility: 'shown'
		})

		msg.stop(true, false).animate({
			opacity: 1,
			top: 0
		}, 500);

		setTimeout(function(){
			msg.animate({
				opacity: 0,
				top: '20px',
			}, 500)
		}, 3000)
	}
}

var JonLambert = {
	RSCQuestionSubmission: RSCQuestionSubmission
};