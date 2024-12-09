import { chakra, useColorMode ,SystemProps} from '@chakra-ui/system'
import { ComponentProps } from 'react'
import { Image } from './Image'

type AvatarImageProps = ComponentProps<typeof Image> & {
  showBorder?: boolean;
  src: string;
  alt: string;
  style?: SystemProps;
};

export function NextAvatar ({
  src,
  showBorder,
  alt,
  style,
  ...props
}: AvatarImageProps) {
  const { colorMode } = useColorMode()

  return (
    // <Image
    //   {...props}
    //   {...(showBorder
    //     ? {
    //         border: '2px',
    //         borderColor: colorMode === 'dark' ? 'navy.700' : 'white'
    //       }
    //     : {})}
    //   alt={alt}
    //   src={src}
    //   style={{ ...style, borderRadius: '50%' }}
    // />
    <p></p>
  )
}

export const ChakraNextAvatar = chakra(NextAvatar, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})
