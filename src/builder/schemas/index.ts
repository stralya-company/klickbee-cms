/**
 * Component Schemas and Validation
 *
 * This file exports all the Zod schemas and validation functions for components.
 * It serves as a single entry point for importing these utilities in other parts of the application.
 */

// Export component content props schema
export {
	componentContentPropsSchema,
	type ComponentContentProps,
	type ListType,
	type FieldType,
	listTypeSchema,
	fieldTypeSchema,
} from "@/builder/types/components/properties/componentContentPropsSchema";

// Export component style props schema
export {
	componentStylePropsSchema,
	type ComponentStyleProps,
	// Style-related types
	type DisplayType,
	type PositionType,
	type OverflowType,
	type ObjectFitType,
	type JustifyContent,
	type AlignItems,
	type FlexDirection,
	type FlexWrap,
	type GridAuto,
	type Side,
	type TextAlign,
	type TextTransform,
	type TextDecoration,
	type WhiteSpace,
	type ListStyle,
	type GradientType,
	type ImageSize,
	type ImagePosition,
	type ImageRepeat,
	type BackgroundAttachment,
	type BorderStyle,
	type BackdropFilter,
	type TimingFunction,
	type AnimationType,
	type SpacingValue,
	// Style category schemas
	type LayoutStyle,
	type SizeSpacingStyle,
	type TypographyStyle,
	type BackgroundStyle,
	type BorderCornerStyle,
	type EffectsStyle,
	// Style-related schemas
	displayTypeSchema,
	positionTypeSchema,
	overflowTypeSchema,
	objectFitTypeSchema,
	justifyContentSchema,
	alignItemsSchema,
	flexDirectionSchema,
	flexWrapSchema,
	gridAutoSchema,
	sideSchema,
	textAlignSchema,
	textTransformSchema,
	textDecorationSchema,
	whiteSpaceSchema,
	listStyleSchema,
	gradientTypeSchema,
	imageSizeSchema,
	imagePositionSchema,
	imageRepeatSchema,
	backgroundAttachmentSchema,
	borderStyleSchema,
	backdropFilterSchema,
	timingFunctionSchema,
	animationTypeSchema,
	spacingValueSchema,
	// Style category schemas
	layoutStyleSchema,
	sizeSpacingStyleSchema,
	typographyStyleSchema,
	backgroundStyleSchema,
	borderCornerStyleSchema,
	effectsStyleSchema,
} from "@/builder/types/components/properties/componentStylePropsSchema";

// Export component map schemas
export {
	componentCategorySchema,
	type ComponentCategory,
	componentNameSchema,
	type ComponentName,
	componentMapEntrySchema,
	type ComponentMapEntry,
	componentMapSchema,
	type ComponentMap,
	// Helper function schemas
	createLayoutComponentSchema,
	createTypographyComponentSchema,
	createFormElementComponentSchema,
	// Utility function schemas
	getComponentsByCategorySchema,
	getAvailableCategoriesSchema,
} from "@/builder/types/components/componentMapSchema";

// Export component-specific schemas
export {
	// Layout Components
	sectionSchema,
	containerSchema,
	gridSchema,
	spacerSchema,
	dividerSchema,
	// Typography Components
	headingSchema,
	paragraphSchema,
	richTextSchema,
	listSchema,
	linkSchema,
	// Interactive Components
	buttonSchema,
	// Media Components
	imageSchema,
	videoSchema,
	embedSchema,
	// Form Components
	formBlockSchema,
	// Form Element Components
	textFieldSchema,
	textAreaSchema,
	checkboxSchema,
	radioGroupSchema,
	dropdownSchema,
	fileUploadSchema,
	submitButtonSchema,
	// Component schemas map
	componentSchemas,
} from "@/builder/types/components/componentSchemas";

// Export validation functions
export {
	validateComponentContentProps,
	validateComponentStyleProps,
	validateComponentProps,
	isValidationSuccess,
	getValidationErrorMessages,
} from "@/builder/utils/componentValidation";
