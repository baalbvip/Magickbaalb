
<h1 align="center">Magickbaalb</h1>
<p align="center">This library will work to handle magick in a faster and easier way</hp>



<ol>
<li>
Ask for the metadata information of an image

```js

// you will receive the metadata information in json form
Magick('pathYourImage').metadata()

```
</li>

<li>
Convert the size of your image

```js


Magick('pathYourImage').resize("your resize example: 20x20 or 20%")

```
</li>

<li>
Add blur to your image

```js

Magick('pathYourImage').blur("10x10")

```
</li>

<li>
Customize your image quality

```js

Magick('pathYourImage').quality("50%")

```
</li>

<li>
Send all conversions

```js

Magick('pathYourImage').quality("50%").blur("10x5").resize("20x25").convert("pathSaveImage")

```
</li>
</ol>

