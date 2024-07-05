PGDMP      ;                |         	   CryptoApp    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16562 	   CryptoApp    DATABASE     �   CREATE DATABASE "CryptoApp" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';
    DROP DATABASE "CryptoApp";
                postgres    false            �            1259    16563    country_seq    SEQUENCE     t   CREATE SEQUENCE public.country_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.country_seq;
       public          postgres    false            �            1259    16564    country    TABLE     @  CREATE TABLE public.country (
    id integer DEFAULT nextval('public.country_seq'::regclass) NOT NULL,
    iso character(2) NOT NULL,
    name character varying(80) NOT NULL,
    nicename character varying(80) NOT NULL,
    iso3 character(3) DEFAULT NULL::bpchar,
    numcode smallint,
    phonecode integer NOT NULL
);
    DROP TABLE public.country;
       public         heap    postgres    false    215            �            1259    16576    crypto_values    TABLE     �   CREATE TABLE public.crypto_values (
    id integer NOT NULL,
    name character varying(50),
    symbol character varying(10),
    price_usd numeric,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 !   DROP TABLE public.crypto_values;
       public         heap    postgres    false            �            1259    16582    crypto_values_id_seq    SEQUENCE     �   CREATE SEQUENCE public.crypto_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.crypto_values_id_seq;
       public          postgres    false    218                       0    0    crypto_values_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.crypto_values_id_seq OWNED BY public.crypto_values.id;
          public          postgres    false    219            �            1259    16569    users_crypto    TABLE     �   CREATE TABLE public.users_crypto (
    usuario character varying,
    nombre character varying,
    apellido character varying,
    email character varying,
    password character varying,
    id integer NOT NULL,
    country integer
);
     DROP TABLE public.users_crypto;
       public         heap    postgres    false            �            1259    16586    users_crypto_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_crypto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.users_crypto_id_seq;
       public          postgres    false    217                       0    0    users_crypto_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.users_crypto_id_seq OWNED BY public.users_crypto.id;
          public          postgres    false    220            ]           2604    16583    crypto_values id    DEFAULT     t   ALTER TABLE ONLY public.crypto_values ALTER COLUMN id SET DEFAULT nextval('public.crypto_values_id_seq'::regclass);
 ?   ALTER TABLE public.crypto_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            \           2604    16587    users_crypto id    DEFAULT     r   ALTER TABLE ONLY public.users_crypto ALTER COLUMN id SET DEFAULT nextval('public.users_crypto_id_seq'::regclass);
 >   ALTER TABLE public.users_crypto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    217            �          0    16564    country 
   TABLE DATA           T   COPY public.country (id, iso, name, nicename, iso3, numcode, phonecode) FROM stdin;
    public          postgres    false    216   �       �          0    16576    crypto_values 
   TABLE DATA           R   COPY public.crypto_values (id, name, symbol, price_usd, last_updated) FROM stdin;
    public          postgres    false    218   3       �          0    16569    users_crypto 
   TABLE DATA           _   COPY public.users_crypto (usuario, nombre, apellido, email, password, id, country) FROM stdin;
    public          postgres    false    217   n3                  0    0    country_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.country_seq', 1, false);
          public          postgres    false    215                       0    0    crypto_values_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.crypto_values_id_seq', 8, true);
          public          postgres    false    219                       0    0    users_crypto_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.users_crypto_id_seq', 7, true);
          public          postgres    false    220            `           2606    16575    country country_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.country DROP CONSTRAINT country_pkey;
       public            postgres    false    216            d           2606    16585     crypto_values crypto_values_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.crypto_values
    ADD CONSTRAINT crypto_values_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.crypto_values DROP CONSTRAINT crypto_values_pkey;
       public            postgres    false    218            b           2606    16594    users_crypto users_crypto_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.users_crypto
    ADD CONSTRAINT users_crypto_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.users_crypto DROP CONSTRAINT users_crypto_pkey;
       public            postgres    false    217            e           2606    16595    users_crypto countries    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_crypto
    ADD CONSTRAINT countries FOREIGN KEY (country) REFERENCES public.country(id) NOT VALID;
 @   ALTER TABLE ONLY public.users_crypto DROP CONSTRAINT countries;
       public          postgres    false    4704    217    216            �      x�m��r�H���O��LGTwB\JB���Ps#�j[]yT��va�ξ�;�{�oI�垙�[�����d ���Xڑ�fv$��Oű:�����!�Qo(v@q ��>�APh],�ǽ���T^�v?�ݳ�-����!v*vH�kG��cȞ��/���x��,e`R,�7{&v4����C�4��ex#���3Ŏ�/�@����X���M���7����R�����[2��%�gh2;q3�չh���G�m��MoʤJ�/r���}�N�|�W���_�N��]t�B��Nn�m'������dȱ�6el��A=�Z�6�e��$��3B ˷4�v_��t�2�d8��#�sJ�%v�\N�8�y*#S�Ao ׳�换��ĸc��f�����oU�?�殨�P��=d:e#�8�8���S<��I�e*��y�ao0����GJ�Ց�DK�V�ęA-{����C�P���Y�d|#�u�L�qD�l�b]��<Ԭ�82�Zfpv�x���<�� �Mƽ�n�X�y����Y�26a~o8g�u�3�]�(��`��p$�-ݑ���C���*�0����N�<��0�,�`�X����jK��E���"1�#�܌)��A(N}��!�bZ2�2f���E�uK/�{�x����'ԤU�e��(�o�V���	�aMz� j��Y������BI��L0Fؼ�$�xY�O5,��|+�}�t`n�3���n'{��4ŏ�5���V?��$~�˾�|�;v=�f^Bs� ��:W���|�0����oV64��+db����0X����g*��0��˪?SI��C�0�H��8��=8q�`a��;��c�j�,Јx2��FmM��������K����ũ��k�f��Wڜ�(م}��>�Y2Oz�j)�:1�x��9�80��R�L���K�8R����#��
��ǂ��3��X�H�T�e�M��P_{����<(^���lJq������aʫt��w�L�}}�˝4O������q��;ׄ�����%'�:w�O�#�ۿw�9)_.w��%�(�n��C�f�.���S� �;����$n@�����v����1q#�D5�D/�%'�0-:��~�!!�j�T�}jF��7�t��Ds�.�0�eϱ����<l:Z���}}���ȏ�����o�s2��)�q�,�C�|�,i���9�
Q�a��:�s����C�ʘӞ�����'�~��mp����ϖ^慱�؄�w���vu�?��OeV>��MADzA��]��n[HN�pW�ī����}���������	-D��JJ�|?Ѡ�&(���1{c$�C��׿���Otg�Rk��a�g�3�a78z7�9S65{.hBE�D2
�Spk��1��C�>�C{wku����rjt�a���)*�������oFbozcKf+�yQh'�/��E�Uf�

KP��Tf����2����/�J["��np�Pfq�GʞY�\�9����&xOs �;��y#�`3P1P͙<�����/�F����g�x�n�����r�o���x�t#^ t
6�p��[;Ml�a��,>��9��>�<[��_
n�i/.ձ,d}V��1�)s���77PPǤ�aɜ�牗f���t��P�bD���_[ϖ~�V��SU�(M��f ��e*���`�����������"���UU�M���x�}�J}��a�󘙒�{��y�����!�8�z���oe�#�y�GE�W��L{D�9�~�z�yul�uJh!�GLF�#דyS�K�q"�˨�X�i�"w��ָ;o�#�
�5�.�9����d,�w�u�"/������<���N�XX.[4%{���`��1��ҷ�):�T6?lU� ��d*��LdaSbҢ�# �M�*����Z����pQ��p���(�d*�'%(��Q)<،��q�4S��`���!
�҄�scڳ�X��L�Բf	-��5��Oa sYTw�"���!G����g��ؾH<i,��D�ĕ�F{��F�vwU�N��$�@��`&3�j�/4m�]$3(@��T�X#:k�k��h�C}ya�`<��,Ss��♯�>�d&�'[dڙy踭��C3d@��Ͱg�Y$�Y�y��#�h�Foz#����W��W�_�
Lta�#f���{�]<�"ߵ\��v�c6�4�|\f���m�,@gT}Yȴ7	@f��ɛ}�(4tgqd�6+˲hެ����C},��4ps�0rj�Ɩ%��O=��׍F?|��g�d0�Y����,�ը�u�3-g��3����X��8��		ɲ>>\2�%��Pf�r�4���?J��_�f20`�5�Y�츓��t|�:�foj����z�&��e�Gp ETed�� ��J�p��S�?���ĝ�CQw���X�4ɞn��	Ŏ>�������|j���g4����BsΡ��u��:��|}��$�%}���A��A� &zR4�柳M�䟚�<hM�m��X��b;����U�	�7*���)��ܒ#j�%G��I
�"k�L�vM��{[��ݮ9 �h)�,��)�L���A��t\��|��j/+{o���MŪ�Q|}j/*he"KȌɾW%�ٲ*���~3��.�|J�;h�����C��@R�Tr��UL4�����xxI�$�UM��������P���'a�&���a��U�������2�S����VV����;�K=Ss�X���.Y���^����{'�j=�)�����? S	���q�(��T���N,ؙ&�Aq���DÞp�Gϱ#bPP�G�P@�g `�zk1�J�B���2��T��j�XFъ�2�M��w�����k�RUc�
���B��ۉ��U7��}׎�+����뫪>��:��	�dL0d4�yQ�y�yP@���t.���A�b>ÑM�2o�Ȃ��tioɂ,�Ћ+䎋r���1O\�Q�@^�Gm�P�A���.�����o�5���L	W�I�����ZX����y��³p5��!É�f��;u	�!!�8�_����T �*܊���ѡ�^��C��:6�J�k	v�Ք�U�Z�K!�pP�n�f�o�'�<T� #�l#���V������
���(�(̴3k�83?6��CU�.�Nҥ�a),��Sq8�G���s���X��:(��=%?���~)Y�3�+H��a?�sV+ϰ� �Z���n�R��Ӵ:̯�~�^�*򘐚�i�HO:��fg���Z��,I� @�Y� M
�H�}�II���}�5�`O��9�C�E�O��7�0Wo���T�GX�7]���|(��򡋢'u&�4�#ء�i���x�/~(����D!Xɘ�)#��l�/�_�˧�8m�#F��H	�^Q����eH@6�U`��S%�R�,Q��	�Z��H냤4����4w���^W��FmHm�^1l+�����V��B����1�^�t|�3xV+���ɂ ��G�^���e<P/��$Jhʓ�Ks��#*����S��yk;��|)TQš���-��S,ߩnT*v�6
f��i�D���@��K� �qH_o���QFn��K�2x�w���M���nq�:��eWh�i�F�[�g�`A��e��h)^@OϿ�́|+�)/��A�i|$��<�H
 y,�HL3g
��v�ƪ�� @���$H��3�$_2��~�
������
D����������g0�w�;ǩ9T������>Z�	T�����A�cKuQ�8�-�u����1ߋW���c�!��I�$&�+Bo��|�}������[�����.ئ9���� ����Y[z�[�7d�j7	8����>���}o�˓���7����_^���z6mDVjSPp�q��Bkz#��D��4�s���qMV��˥諎\Ӗ5��"�	�7'��j5��NA^�B;��j�YBr����u��E'>�7��^R��_�Y�3?U��兵N�P���B�%�~�ڊ��������Fb�y�8   �D!�V!�V�X��;m ��:�%��6�F.���o�˓�h�`Y�^��z���R6�Z��j�|vs�����lS4��\h�7��Pl�Q��%��X���Cb�$�$1%lcPR?�(�!��z���8�+W-�F�v��餂��vj"���խY�l)��y�ÊBkt�z��Tҥ��e���'KZT�sYH�鄯
Ȁ�2r]�W~��m�y��nԪ:�Om��ߪ䬅-,}`ͽ�r�[+��+�r��N���u[H)�Ң�I�u�����sw#��^vy����Og��D���mɍ�}x;���v���u�m��}��N/g���V7.��G���-�����YsK��س�v�%սw~���9�t$7��;S�¸��aw@T+r},%�g�sw�5c𧻓�5��E�9a,%��-�mzy�Z�G������I�R��E�j}ZKUz�
�Qzk*	��v��i�H�P��Mo$����EW40����Sن�t�6�����NȞS���<���*����:=��v��q���p�U*%�	�k���*��$]1����-_u��4z=�4��%j�[��}pM7DcN'��ǑT_⟏)�>
�?_SR���x�C^��a��b�
p�3��b"{������"�-����ιL��4�7��z����]+�3������t��eܻ�v�h�������֙Qg8���i�/�鋾�z)<�s��� �&~�UV츩�Aq��1RS(6U*�9�4ׄ=�h���`�H��t#��n�����Rj�L��f:���}z���Iw�t���L��;�f�sݶ��Z��-�e��G�{I��B�~=��������*u�d��-l�L��xԚL�G���).�n�g�dAT�t؊.�$J�Ķv�]b��+������=?�R&�^a�z��m%���^����u=��ӽ�eE�]/{֍>�ޗ��ӽ�e[}'#Ͷt�S�n��ֿb����������1D��=��^ȧ>�FӅ�@?+�?4��y�4W��3T�Ҍx���ɖ��t�Tt����W�H�����_�x�U�u�+i<�NFbo���ґd��E,Y�XS��F�*�50$[ѹ�e��R1P�
dB�Ɲ@2���`1#�(��n�^wbJ�I���3�S�,v�g"zX=�Ve�]��3�Dᝥ�2�HS���Y�[�а��N�$������_���y��?��|�^�O��U��f���]�-+��G'�K�U���o�r㉦��PG��]H��S����.��E�o�o�
b��VC"��`d��Q]��>/p��P��E�c�����l��?_�<<ɿ�<J�Cb� $��tu
�څ����rU��.��JSR�:1(�Qǲp��p��rv���?����c�y����w��y�����q2:�D������z��X흡��p��~|9^��;s���ک-�wB��ۼ���6�Z� M��S��ǻ�j�㮼�*�b�oPB`�&���v���x)��H���J2��G��=`ǖ����6f������6���5_�T�OK��%����n�����>��?�`��=������!�>�!N;����"�-����翝~SJ���_!�.��l粵���T{�c_�l�á�tz~9_�|�`.�Z��?�1�[�V=K�?$[�i�U���ɞ�0D`4�g�P/^<
�&�+�o���L� h�C�wo^���k"� ��s*����б�žz�+4���M f��(^{��(*i�C�
������h;�؍1�/+Y�i��eU��o5_D�����"�ǷQ�?��j���Yr�w>�G�<ާ~�X��U���cjj�o��#�n)U,�]P=��jy�w�8X����P��7OګG�Ҵ��n��=\I�օ,ȁ" �,H����F�"�P�?ԧ�6�i"��x��>�������(��u[6:ӭ�3�~K������f#��̝B��C��
�~ܽɁ?$�_u�}�݅���.�$�%F)�/�v�+D�h!V��%����?y���tP��?���P#Ġ���z������\      �   ]   x�e�1
�0F�99�hh����Y\
N.���$��ƏWI����Mɲ!�H�iǬ�Z4�8��I��	�@�ͤh+��p��?�&hބ��ie      �   �   x�u�Mn�0��/���3t;���.z�٘���9�`=C/���_)ҋ���S�D�O9,���I�"�-����2���N2Z7-j�w.�D�A�ޤ�2��W5�a1���F�i��l`�[��{ᗲ,OڢQ�|0[������#ʜ����<���!�}�:�͟
�"{(��*�{?tE��z��'�{����=��]*����z�     