/*
* Youtube Embed Plugin
*
* @author Jonnas Fonini <contato@fonini.net>
* @version 2.0.6
*/
( function() {
	CKEDITOR.plugins.add( 'youtube',
	{
		lang: [ 'en', 'pt', 'ja', 'hu', 'it', 'fr', 'tr', 'ru', 'de', 'ar', 'nl', 'pl', 'vi', 'zh', 'el', 'he', 'es', 'nb', 'nn', 'fi', 'et', 'sk'],
		init: function( editor )
		{
			editor.addCommand( 'youtube', new CKEDITOR.dialogCommand( 'youtube', {
				allowedContent: 'div[*]; iframe[!width,!height,!src,!frameborder,!allowfullscreen]; object param[*]'
			}));

			editor.ui.addButton( 'Youtube',
			{
				label : editor.lang.youtube.button,
				toolbar : 'insert',
				command : 'youtube',
				icon : this.path + 'images/icon.png'
			});

			CKEDITOR.dialog.add( 'youtube', function ( instance )
			{
				var video;

				return {
					title : editor.lang.youtube.title,
					minWidth : 500,
					minHeight : 200,
					contents :
						[{
							id : 'youtubePlugin',
							expand : true,
							elements : [
								{
									type : 'hbox',
									widths : [ '100%'],
									children :
									[
										{
											id : 'txtUrl',
											type : 'text',
											label : editor.lang.youtube.txtUrl,
											onChange : function ( api )
											{
												handleLinkChange( this, api );
											},
											onKeyUp : function ( api )
											{
												handleLinkChange( this, api );
											},
											validate : function ()
											{
												if ( this.isEnabled() )
												{
													if ( !this.getValue() )
													{
														alert( editor.lang.youtube.noCode );
														return false;
													}
													else{
														video = ytVidId(this.getValue());

														if ( this.getValue().length === 0 ||  video === false)
														{
															alert( editor.lang.youtube.invalidUrl );
															return false;
														}
													}
												}
											}
										},
									]
								},
								{
									type : 'hbox',
									widths : [ '100%' ],
									children :
										[
											{
												id : 'chkResponsive',
												type : 'checkbox',
												label : editor.lang.youtube.txtResponsive,
												'default' : editor.config.youtube_responsive != null ? editor.config.youtube_responsive : true,
												setup: function (api) {
													handleResponsiveChange(this, api);
												},
												onClick: function (api) {
													handleResponsiveChange(this, api);
												}
											}
										]
								},
								{
									type: 'hbox',
									widths: ['50%', '50%'],
									// Default to hidden, class toggled by 'Responsive' button
									style: 'display: none;',
									id: 'dimensions',
									children:
										[
											{
												type : 'text',
												id : 'txtWidth',
												label : editor.lang.youtube.txtWidth,
												'default' : editor.config.youtube_width != null ? editor.config.youtube_width : '640',
												validate : function ()
												{
													if ( this.getValue() )
													{
														var width = parseInt ( this.getValue() ) || 0;

														if ( width === 0 )
														{
															alert( editor.lang.youtube.invalidWidth );
															return false;
														}
													}
													else {
														alert( editor.lang.youtube.noWidth );
														return false;
													}
												}
											},
											{
												type : 'text',
												id : 'txtHeight',
												label : editor.lang.youtube.txtHeight,
												'default' : editor.config.youtube_height != null ? editor.config.youtube_height : '360',
												validate : function ()
												{
													if ( this.getValue() )
													{
														var height = parseInt ( this.getValue() ) || 0;

														if ( height === 0 )
														{
															alert( editor.lang.youtube.invalidHeight );
															return false;
														}
													}
													else {
														alert( editor.lang.youtube.noHeight );
														return false;
													}
												}
											}
										]
								},
								{
									type : 'hbox',
									widths : [ '55%', '45%' ],
									children :
									[
										{
											id : 'chkRelated',
											type : 'checkbox',
											'default' : editor.config.youtube_related != null ? editor.config.youtube_related : true,
											label : editor.lang.youtube.chkRelated
										},
										{
											id : 'chkOlderCode',
											type : 'checkbox',
											'default' : editor.config.youtube_older != null ? editor.config.youtube_older : false,
											label : editor.lang.youtube.chkOlderCode
										}
									]
								},
								{
									type : 'hbox',
									widths : [ '55%', '45%' ],
									children :
									[
										{
											id : 'chkPrivacy',
											type : 'checkbox',
											label : editor.lang.youtube.chkPrivacy,
											'default' : editor.config.youtube_privacy != null ? editor.config.youtube_privacy : false
										},
										{
											id : 'chkAutoplay',
											type : 'checkbox',
											'default' : editor.config.youtube_autoplay != null ? editor.config.youtube_autoplay : false,
											label : editor.lang.youtube.chkAutoplay
										}
									]
								},
								{
									type : 'hbox',
									widths : [ '55%', '45%'],
									children :
									[
										{
											id : 'txtStartAt',
											type : 'text',
											label : editor.lang.youtube.txtStartAt,
											validate : function ()
											{
												if ( this.getValue() )
												{
													var str = this.getValue();

													if ( !/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/i.test( str ) )
													{
														alert( editor.lang.youtube.invalidTime );
														return false;
													}
												}
											}
										},
										{
											id: 'empty',
											type: 'html',
											html: ''
										}
									]
								}
							]
						}
					],
					onOk: function()
					{
						var content = '';
						var responsiveStyle='';

						var url = '//', params = [], startSecs;
						var width = this.getValueOf( 'youtubePlugin', 'txtWidth' );
						var height = this.getValueOf( 'youtubePlugin', 'txtHeight' );

						if ( this.getContentElement( 'youtubePlugin', 'chkPrivacy' ).getValue() === true )
						{
							url += 'www.youtube-nocookie.com/';
						}
						else {
							url += 'www.youtube.com/';
						}

						url += 'embed/' + video;

						if ( this.getContentElement( 'youtubePlugin', 'chkRelated' ).getValue() === false )
						{
							params.push('rel=0');
						}

						if ( this.getContentElement( 'youtubePlugin', 'chkAutoplay' ).getValue() === true )
						{
							params.push('autoplay=1');
						}

						startSecs = this.getValueOf( 'youtubePlugin', 'txtStartAt' );
						if ( startSecs ){
							var seconds = hmsToSeconds( startSecs );

							params.push('start=' + seconds);
						}

						if ( params.length > 0 )
						{
							url = url + '?' + params.join( '&' );
						}

						if ( this.getContentElement( 'youtubePlugin', 'chkResponsive').getValue() === true ) {
							if (editor.config.youtube_classes) {
								content += '<div class="'+editor.config.youtube_classes[0]+'">';
								responsiveStyle = 'class="'+editor.config.youtube_classes[1]+'">';
							} else {
								content += '<div style="position:relative;padding-bottom:56.25%;padding-top:30px;height:0;overflow:hidden;">';
								responsiveStyle = 'style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"';
							}
						}

						content += '<iframe width="' + width + '" height="' + height + '" src="' + url + '" ' + responsiveStyle;
						content += 'frameborder="0" allowfullscreen></iframe>';

						if ( this.getContentElement( 'youtubePlugin', 'chkResponsive').getValue() === true ) {
							content += '</div>';
						}

						var element = CKEDITOR.dom.element.createFromHtml( content );
						var instance = this.getParentEditor();
						instance.insertElement(element);
					}
				};
			});
		}
	});
})();

function handleLinkChange( el, api )
{
	if ( el.getValue().length > 0 )
	{
		el.getDialog().getContentElement( 'youtubePlugin', 'txtEmbed' ).disable();
	}
	else {
		el.getDialog().getContentElement( 'youtubePlugin', 'txtEmbed' ).enable();
	}
}

function handleResponsiveChange(element, api) {
	var $dimensionsBox = element.getDialog().getContentElement('youtubePlugin', 'dimensions').getElement();
	if (!$dimensionsBox.isVisible()) {
		$dimensionsBox.show();
	} else {
		$dimensionsBox.hide();
	}
}

function handleEmbedChange( el, api )
{
	if ( el.getValue().length > 0 )
	{
		el.getDialog().getContentElement( 'youtubePlugin', 'txtUrl' ).disable();
	}
	else {
		el.getDialog().getContentElement( 'youtubePlugin', 'txtUrl' ).enable();
	}
}


/**
 * JavaScript function to match (and return) the video Id
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: http://stackoverflow.com/a/10315969/624466
 */
function ytVidId( url )
{
	var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	return ( url.match( p ) ) ? RegExp.$1 : false;
}

/**
 * Converts time in hms format to seconds only
 */
function hmsToSeconds( time )
{
	var arr = time.split(':'), s = 0, m = 1;

	while (arr.length > 0)
	{
		s += m * parseInt(arr.pop(), 10);
		m *= 60;
	}

	return s;
}
