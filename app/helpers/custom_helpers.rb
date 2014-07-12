module CustomHelpers

	# handle the body class. first check with the sitewide var if a global class has been defined
	# then add any page-level vars to it.
	def body_class
		thisBodyClass = "";
		if @sitewideBodyClass
			if thisBodyClass != ""
				thisBodyClass += " "
			end
			if @sitewideBodyClass.kind_of?(Array)
				@sitewideBodyClass.each_with_index do |bodyclassW, index|
					thisBodyClass += bodyclassW
					index = index + 1
					if index < @sitewideBodyClass.count
						thisBodyClass += " "
					end
				end
			else
				thisBodyClass += @sitewideBodyClass
			end
		end
		if current_page.data.bodyclass
			if thisBodyClass != ""
				thisBodyClass += " "
			end
			if current_page.data.bodyclass.kind_of?(Array)
				if current_page.data.bodyclass
					current_page.data.bodyclass.each_with_index do |bodyclass, index|
						thisBodyClass += bodyclass
						index = index + 1
						if index < current_page.data.bodyclass.count
							thisBodyClass += " "
						end
					end
				end
			else
				thisBodyClass += current_page.data.bodyclass
			end
		end
		"#{thisBodyClass}"
	end

	#get the class from the partial and process it bem style
	def get_class(partial, locals = nil, comment = false)
		return_class = partial
		
		unless locals[:modifiers].nil?
			locals[:modifiers].each do |mod|
				return_class += " #{partial}--" + mod
			end
		end

		unless locals[:states].nil?
			locals[:states].each do |state|
				return_class += " " + state
			end
		end

		"#{return_class}"
	end

	#process the data attribute
	def get_data(locals = nil)
		return_data = '';

		unless locals[:data].nil?
			locals[:data].each do |state|
				if state.include? "data-"
				   return_data += " " + state
				else
					return_data += " data-" + state
				end			
			end
		end

		"#{return_data}"
	end

	#handle partial so that html chunks of content can be passed into them
	def partial_with_content(partial_name, partial_attributes, &block)
		concat_safe_content partial(partial_name, :locals => {
			:contents => capture_html(&block),
			:attrs => partial_attributes,
			:modifiers => partial_attributes[:modifiers],
			:data => partial_attributes[:data],
			:states => partial_attributes[:states]
		})
	end

end