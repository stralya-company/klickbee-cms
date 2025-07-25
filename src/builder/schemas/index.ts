/**
 * Component Schemas and Validation
 *
 * This file exports all the Zod schemas and validation functions for components.
 * It serves as a single entry point for importing these utilities in other parts of the application.
 */

// Export component map schemas
export {
	type ComponentCategory,
	type ComponentMap,
	type ComponentMapEntry,
	type ComponentName,
	componentCategorySchema,
	componentMapEntrySchema,
	componentMapSchema,
	componentNameSchema,
	createFormElementComponentSchema,
	// Helper function schemas
	createLayoutComponentSchema,
	createTypographyComponentSchema,
	getAvailableCategoriesSchema,
	// Utility function schemas
	getComponentsByCategorySchema,
} from "@/builder/types/components/componentMapSchema";
// Export component-specific schemas
export {
	// Interactive Components
	buttonSchema,
	checkboxSchema,
	// Component schemas map
	componentSchemas,
	containerSchema,
	dividerSchema,
	dropdownSchema,
	embedSchema,
	fileUploadSchema,
	// Form Components
	formBlockSchema,
	gridSchema,
	// Typography Components
	headingSchema,
	// Media Components
	imageSchema,
	linkSchema,
	listSchema,
	paragraphSchema,
	radioGroupSchema,
	richTextSchema,
	// Layout Components
	sectionSchema,
	spacerSchema,
	submitButtonSchema,
	textAreaSchema,
	// Form Element Components
	textFieldSchema,
	videoSchema,
} from "@/builder/types/components/componentSchemas";
// Export component content props schema
export {
	type ComponentContentProps,
	componentContentPropsSchema,
	type FieldType,
	fieldTypeSchema,
	type ListType,
	listTypeSchema,
} from "@/builder/types/components/properties/componentContentPropsSchema";
// Export component style props schema
export {
	type AlignItems,
	type AnimationType,
	alignItemsSchema,
	animationTypeSchema,
	type BackdropFilter,
	type BackgroundAttachment,
	type BackgroundStyle,
	type BorderCornerStyle,
	type BorderStyle,
	backdropFilterSchema,
	backgroundAttachmentSchema,
	backgroundStyleSchema,
	borderCornerStyleSchema,
	borderStyleSchema,
	type ComponentStyleProps,
	componentStylePropsSchema,
	// Style-related types
	type DisplayType,
	// Style-related schemas
	displayTypeSchema,
	type EffectsStyle,
	effectsStyleSchema,
	type FlexDirection,
	type FlexWrap,
	flexDirectionSchema,
	flexWrapSchema,
	type GradientType,
	type GridAuto,
	gradientTypeSchema,
	gridAutoSchema,
	type ImagePosition,
	type ImageRepeat,
	type ImageSize,
	imagePositionSchema,
	imageRepeatSchema,
	imageSizeSchema,
	type JustifyContent,
	justifyContentSchema,
	// Style category schemas
	type LayoutStyle,
	type ListStyle,
	// Style category schemas
	layoutStyleSchema,
	listStyleSchema,
	type ObjectFitType,
	type OverflowType,
	objectFitTypeSchema,
	overflowTypeSchema,
	type PositionType,
	positionTypeSchema,
	type Side,
	type SizeSpacingStyle,
	type SpacingValue,
	sideSchema,
	sizeSpacingStyleSchema,
	spacingValueSchema,
	type TextAlign,
	type TextDecoration,
	type TextTransform,
	type TimingFunction,
	type TypographyStyle,
	textAlignSchema,
	textDecorationSchema,
	textTransformSchema,
	timingFunctionSchema,
	typographyStyleSchema,
	type WhiteSpace,
	whiteSpaceSchema,
} from "@/builder/types/components/properties/componentStylePropsSchema";

// Export validation functions
export {
	getValidationErrorMessages,
	isValidationSuccess,
	validateComponentContentProps,
	validateComponentProps,
	validateComponentStyleProps,
} from "@/builder/utils/componentValidation";
