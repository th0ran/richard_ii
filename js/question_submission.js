var RSCQuestionSubmission = function() {
	var t = this;
	var api_url = "/admin";

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

		t.submit_question(params, function(d) {
			console.log(d);

			$('#question-submit-form-school_name').val('')
			$('#question-submit-form-name').val('')
			$('#question-submit-form-body').val('')
			$('#question-submit-form-postcode').val('')

		});

		return false;
	}

	this.add_listeners();
}

var JonLambert = {
	RSCQuestionSubmission: RSCQuestionSubmission
};