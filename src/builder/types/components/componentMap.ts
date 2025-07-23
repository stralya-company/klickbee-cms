import { ComponentContentProps } from "@/builder/types/components/properties/componentContentPropsType";
import { ComponentStyleProps } from "@/builder/types/components/properties/componentStylePropsType";

export type ComponentMapEntry = {
	contentProps: Partial<ComponentContentProps>;
	styleProps: Partial<ComponentStyleProps>;
};

export const componentMap: Record<string, ComponentMapEntry> = {
	Section: {
		contentProps: {},
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Container: {
		contentProps: {},
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Grid: {
		contentProps: {},
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Spacer: {
		contentProps: {},
		styleProps: {
			sizeAndSpacing: {},
		},
	},
	Divider: {
		contentProps: {},
		styleProps: {
			sizeAndSpacing: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Heading: {
		contentProps: { text: "", level: 1 },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			effects: {},
		},
	},
	Paragraph: {
		contentProps: { text: "" },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			effects: {},
		},
	},
	RichText: {
		contentProps: { content: "" },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	List: {
		contentProps: { listType: "bulleted", items: [] },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Link: {
		contentProps: { text: "", href: "", openInNewTab: false },
		styleProps: {
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Button: {
		contentProps: { text: "", href: "", icon: "" },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Image: {
		contentProps: { src: "", alt: "" },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Video: {
		contentProps: { src: "", autoplay: false, controls: false },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Embed: {
		contentProps: { code: "" },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
		},
	},
	FormBlock: {
		contentProps: { successMessage: "", errorMessage: "" },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	TextField: {
		contentProps: {
			name: "",
			placeholder: "",
			required: false,
			type: "text",
		},
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	TextArea: {
		contentProps: { name: "", placeholder: "", required: false },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Checkbox: {
		contentProps: { label: "", defaultChecked: false },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	RadioGroup: {
		contentProps: { question: "", options: [] },
		styleProps: {
			layout: {},
			sizeAndSpacing: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	Dropdown: {
		contentProps: { name: "", options: [], defaultText: "" },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	FileUpload: {
		contentProps: { name: "", mimeTypes: [], maxFileSize: 0 },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
	SubmitButton: {
		contentProps: { text: "" },
		styleProps: {
			sizeAndSpacing: {},
			typography: {},
			background: {},
			bordersAndCorners: {},
			effects: {},
		},
	},
};
