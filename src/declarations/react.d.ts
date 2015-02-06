// Type definitions for React 0.13.0
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>, AssureSign <http://www.assuresign.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'react' {
    interface ComponentClass<P> { 
        new(props: P): Component<any, any>; 
        prototype: { props: P };
    }
    //
    // Component
    // ----------------------------------------------------------------------

    class Component<P extends BaseProps, S> {
        constructor(initialProps: P);

        public getDOMNode(): Element;
        public isMounted(): boolean;


        props: P;
        
        protected setProps(nextProps: P, callback?: () => void): void;
        protected replaceProps(nextProps: P, callback?: () => void): void;

        state: S;
        protected setState(nextState: S, callback?: () => void): void;
        protected replaceState(nextState: S, callback?: () => void): void;
        
        protected context: any; // I won't introduce a third generic type for that sorry
        

        protected render(): ReactElement | string;


        protected componentWillMount(): void;
        protected componentDidMount(): void;
        protected componentWillReceiveProps(nextProps: P): void;
        protected shouldComponentUpdate(nextProps: P, nextState: S): boolean;
        protected componentWillUpdate(nextProps: P, nextState: S): void;
        protected componentDidUpdate(prevProps: P, prevState: S): void;
        protected componentWillUnmount(): void;


        static defaultProps: any;
        static propTypes: ValidationMap<any>;
        static contextTypes: ValidationMap<any>;
        static childContextTypes: ValidationMap<any>;
    }

    //
    // ReactElement
    // ----------------------------------------------------------------------



    interface ReactCompositeElement<P> {
        type: ComponentClass<P>
        ref: (c: Component<any, any>) => any;
        key : string | boolean | number;
        props: P;
    }

    interface ReactHTMLElement {
        type: string;
        ref: (c: Component<HTMLAttributes, any>) => any;
        key : string | boolean | number;
        props: HTMLAttributes;
    }

    interface ReactSVGElement {
        type: string;
        ref: (c: Component<SVGAttributes, any>) => any;
        key : string | boolean | number;
        props: SVGAttributes;
    }

    type ReactElement = ReactHTMLElement | ReactSVGElement | ReactCompositeElement<any>;

    interface ReactElementArray extends Array<string | ReactElement | ReactElementArray> {}


    function createElement(type: string, props: HTMLAttributes, ...children: any[]): ReactHTMLElement;
    function createElement(type: string, props: SVGAttributes, ...children: any[]): ReactSVGElement;
    function createElement<P extends BaseProps>(type: ComponentClass<P>, props: P, ...children: any[]): ReactCompositeElement<P>
  
    
    
    //
    // Event System
    // ----------------------------------------------------------------------

    interface SyntheticEvent {
        bubbles: boolean;
        cancelable: boolean;
        currentTarget: EventTarget;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean;
        nativeEvent: Event;
        preventDefault(): void;
        stopPropagation(): void;
        target: EventTarget;
        timeStamp: Date;
        type: string;
    }

    interface ClipboardEvent extends SyntheticEvent {
        clipboardData: DataTransfer;
    }

    interface KeyboardEvent extends SyntheticEvent {
        altKey: boolean;
        charCode: number;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        key: string;
        keyCode: number;
        locale: string;
        location: number;
        metaKey: boolean;
        repeat: boolean;
        shiftKey: boolean;
        which: number;
    }

    interface FocusEvent extends SyntheticEvent {
        relatedTarget: EventTarget;
    }

    interface FormEvent extends SyntheticEvent {
    }

    interface MouseEvent extends SyntheticEvent {
        altKey: boolean;
        button: number;
        buttons: number;
        clientX: number;
        clientY: number;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        metaKey: boolean;
        pageX: number;
        pageY: number;
        relatedTarget: EventTarget;
        screenX: number;
        screenY: number;
        shiftKey: boolean;
    }

    interface TouchEvent extends SyntheticEvent {
        altKey: boolean;
        changedTouches: TouchList;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: TouchList;
        touches: TouchList;
    }

    interface UIEvent extends SyntheticEvent {
        detail: number;
        view: AbstractView;
    }

    interface WheelEvent extends SyntheticEvent {
        deltaMode: number;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
    }

    //
    // Event Handler Types
    // ----------------------------------------------------------------------

    interface EventHandler<E extends SyntheticEvent> {
        (event: E): void;
    }

    interface ClipboardEventHandler extends EventHandler<ClipboardEvent> {}
    interface KeyboardEventHandler extends EventHandler<KeyboardEvent> {}
    interface FocusEventHandler extends EventHandler<FocusEvent> {}
    interface FormEventHandler extends EventHandler<FormEvent> {}
    interface MouseEventHandler extends EventHandler<MouseEvent> {}
    interface TouchEventHandler extends EventHandler<TouchEvent> {}
    interface UIEventHandler extends EventHandler<UIEvent> {}
    interface WheelEventHandler extends EventHandler<WheelEvent> {}
    
    
    //
    // Attributes
    // ----------------------------------------------------------------------

    interface BaseProps {
        children?: string | ReactElement | ReactElementArray;
        key?:  string;
        ref?: (c: Component<any, any>) => void
    }
    
    
    interface ReactBaseElementAttributes extends BaseProps {
        // Event Attributes
        onCopy?: ClipboardEventHandler;
        onCut?: ClipboardEventHandler;
        onPaste?: ClipboardEventHandler;
        onKeyDown?: KeyboardEventHandler;
        onKeyPress?: KeyboardEventHandler;
        onKeyUp?: KeyboardEventHandler;
        onFocus?: FocusEventHandler;
        onBlur?: FocusEventHandler;
        onChange?: FormEventHandler;
        onInput?: FormEventHandler;
        onSubmit?: FormEventHandler;
        onClick?: MouseEventHandler;
        onDoubleClick?: MouseEventHandler;
        onDrag?: MouseEventHandler;
        onDragEnd?: MouseEventHandler;
        onDragEnter?: MouseEventHandler;
        onDragExit?: MouseEventHandler;
        onDragLeave?: MouseEventHandler;
        onDragOver?: MouseEventHandler;
        onDragStart?: MouseEventHandler;
        onDrop?: MouseEventHandler;
        onMouseDown?: MouseEventHandler;
        onMouseEnter?: MouseEventHandler;
        onMouseLeave?: MouseEventHandler;
        onMouseMove?: MouseEventHandler;
        onMouseOut?: MouseEventHandler;
        onMouseOver?: MouseEventHandler;
        onMouseUp?: MouseEventHandler;
        onTouchCancel?: TouchEventHandler;
        onTouchEnd?: TouchEventHandler;
        onTouchMove?: TouchEventHandler;
        onTouchStart?: TouchEventHandler;
        onScroll?: UIEventHandler;
        onWheel?: WheelEventHandler;

        dangerouslySetInnerHTML?: {
            __html: string;
        };
    }

    interface CSSProperties {
        columnCount?: number;
        flex?: number | string;
        flexGrow?: number;
        flexShrink?: number;
        fontWeight?: number;
        lineClamp?: number;
        lineHeight?: number;
        opacity?: number;
        order?: number;
        orphans?: number;
        widows?: number;
        zIndex?: number;
        zoom?: number;

        // SVG-related properties
        fillOpacity?: number;
        strokeOpacity?: number;
    }

    interface HTMLAttributes extends ReactBaseElementAttributes {
        accept?: string;
        acceptCharset?: string;
        accessKey?: string;
        action?: string;
        allowFullScreen?: boolean;
        allowTransparency?: boolean;
        alt?: string;
        async?: boolean;
        autoComplete?: boolean;
        autoFocus?: boolean;
        autoPlay?: boolean;
        cellPadding?: number | string;
        cellSpacing?: number | string;
        charSet?: string;
        checked?: boolean;
        classID?: string;
        className?: string;
        cols?: number;
        colSpan?: number;
        content?: string;
        contentEditable?: boolean;
        contextMenu?: string;
        controls?: any;
        coords?: string;
        crossOrigin?: string;
        data?: string;
        dateTime?: string;
        defer?: boolean;
        dir?: string;
        disabled?: boolean;
        download?: any;
        draggable?: boolean;
        encType?: string;
        form?: string;
        formNoValidate?: boolean;
        frameBorder?: number | string;
        height?: number | string;
        hidden?: boolean;
        href?: string;
        hrefLang?: string;
        htmlFor?: string;
        httpEquiv?: string;
        icon?: string;
        id?: string;
        label?: string;
        lang?: string;
        list?: string;
        loop?: boolean;
        manifest?: string;
        max?: number | string;
        maxLength?: number;
        media?: string;
        mediaGroup?: string;
        method?: string;
        min?: number | string;
        multiple?: boolean;
        muted?: boolean;
        name?: string;
        noValidate?: boolean;
        open?: boolean;
        pattern?: string;
        placeholder?: string;
        poster?: string;
        preload?: string;
        radioGroup?: string;
        readOnly?: boolean;
        rel?: string;
        required?: boolean;
        role?: string;
        rows?: number;
        rowSpan?: number;
        sandbox?: string;
        scope?: string;
        scrollLeft?: number;
        scrolling?: string;
        scrollTop?: number;
        seamless?: boolean;
        selected?: boolean;
        shape?: string;
        size?: number;
        sizes?: string;
        span?: number;
        spellCheck?: boolean;
        src?: string;
        srcDoc?: string;
        srcSet?: string;
        start?: number;
        step?: number | string;
        style?: CSSProperties;
        tabIndex?: number;
        target?: string;
        title?: string;
        type?: string;
        useMap?: string;
        value?: string;
        width?: number | string;
        wmode?: string;

        // Non-standard Attributes
        autoCapitalize?: boolean;
        autoCorrect?: boolean;
        property?: string;
        itemProp?: string;
        itemScope?: boolean;
        itemType?: string;
    }

    interface SVGAttributes extends ReactBaseElementAttributes {
        cx?: SVGLength | SVGAnimatedLength;
        cy?: any; 
        d?: string;
        dx?: SVGLength | SVGAnimatedLength;
        dy?: SVGLength | SVGAnimatedLength;
        fill?: any; // SVGPaint | string
        fillOpacity?: number | string;
        fontFamily?: string;
        fontSize?: number | string;
        fx?: SVGLength | SVGAnimatedLength;
        fy?: SVGLength | SVGAnimatedLength;
        gradientTransform?: SVGTransformList | SVGAnimatedTransformList;
        gradientUnits?: string;
        markerEnd?: string;
        markerMid?: string;
        markerStart?: string;
        offset?: number | string;
        opacity?: number | string;
        patternContentUnits?: string;
        patternUnits?: string;
        points?: string;
        preserveAspectRatio?: string;
        r?: SVGLength | SVGAnimatedLength;
        rx?: SVGLength | SVGAnimatedLength;
        ry?: SVGLength | SVGAnimatedLength;
        spreadMethod?: string;
        stopColor?: any; // SVGColor | string
        stopOpacity?: number | string;
        stroke?: any; // SVGPaint
        strokeDasharray?: string;
        strokeLinecap?: string;
        strokeOpacity?: number | string;
        strokeWidth?: SVGLength | SVGAnimatedLength;
        textAnchor?: string;
        transform?: SVGTransformList | SVGAnimatedTransformList;
        version?: string;
        viewBox?: string;
        x1?: SVGLength | SVGAnimatedLength;
        x2?: SVGLength | SVGAnimatedLength;
        x?: SVGLength | SVGAnimatedLength;
        y1?: SVGLength | SVGAnimatedLength;
        y2?: SVGLength | SVGAnimatedLength
        y?: SVGLength | SVGAnimatedLength;
    }

    
    //
    // Browser Interfaces
    // https://github.com/nikeee/2048-typescript/blob/master/2048/js/touch.d.ts
    // ----------------------------------------------------------------------

    interface AbstractView {
        styleMedia: StyleMedia;
        document: Document;
    }

    interface Touch {
        identifier: number;
        target: EventTarget;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
    }

    interface TouchList {
        [index: number]: Touch;
        length: number;
        item(index: number): Touch;
        identifiedTouch(identifier: number): Touch;
    }
    
    
    
    //
    // React.PropTypes
    // ----------------------------------------------------------------------

    interface Validator<T> {
        (object: T, key: string, componentName: string): Error;
    }

    interface Requireable<T> extends Validator<T> {
        isRequired: Validator<T>;
    }

    interface ValidationMap<T> {
        [key: string]: Validator<T>;
    }

    var PropTypes: {
        any: Requireable<any>;
        array: Requireable<any>;
        bool: Requireable<any>;
        func: Requireable<any>;
        number: Requireable<any>;
        object: Requireable<any>;
        string: Requireable<any>;
        node: Requireable<any>;
        element: Requireable<any>;
        instanceOf(expectedClass: {}): Requireable<any>;
        oneOf(types: any[]): Requireable<any>;
        oneOfType(types: Validator<any>[]): Requireable<any>;
        arrayOf(type: Validator<any>): Requireable<any>;
        objectOf(type: Validator<any>): Requireable<any>;
        shape(type: ValidationMap<any>): Requireable<any>;
    }

    //
    // React.Children
    // ----------------------------------------------------------------------

    type ReactChild = string | ReactElement;
    type ReactChildList = string | ReactElement | ReactElementArray

    interface ReactChildren {
        map<T>(children: ReactElementArray, fn: (child: ReactChild) => T): Array<T>;
        forEach(children: ReactElementArray, fn: (child: ReactChild) => any): void;
        count(children: ReactElementArray): number;
        only(children: ReactElementArray): ReactChild;
    }


    function render(element: ReactElement,  container: Element, callback?: () => void): Component<any, any>;
    function renderToString(element: ReactElement): string;
    function renderToStaticMarkup(element: ReactElement): string;
    function isValidElement(element: any): boolean;
    function unmountComponentAtNode(container: Element): boolean;
    function initializeTouchEvents(shouldUseTouch: boolean): void;

}

